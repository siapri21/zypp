// back-end/src/routes/me.ts
import { Router } from "express";
import { Types } from "mongoose";
import auth, { AuthReq } from "../middleware/auth";
import User from "../models/User";
import Rental from "../models/Rental";
import Invoice from "../models/Invoice";

const r = Router();
r.use(auth);

// types communs (en haut du fichier ou dans un util)
const METHODS = ['paypal','applepay','card','none'] as const;
type PayMethod = typeof METHODS[number];


// GET /api/me  => user + rentals + invoices
r.get("/", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const uid = new Types.ObjectId(req.user.id);

  const [u, rentals, invoices] = await Promise.all([
    User.findById(uid).lean(),
    Rental.find({ userId: uid }).sort({ createdAt: -1 }).limit(20).lean(),
    Invoice.find({ userId: uid }).sort({ createdAt: -1 }).limit(20).lean(),
  ]);
  if (!u) return res.sendStatus(404);

  const { _id, __v, passwordHash, ...rest } = u as any;
  return res.json({ user: { id: String(_id), ...rest }, rentals, invoices });
});

// POST /api/me/rentals/start
r.post("/rentals/start", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const uid = new Types.ObjectId(req.user.id);
  const { scooterId } = req.body;
  const rental = await Rental.create({ userId: uid, scooterId });
  res.status(201).json(rental);
});

// POST /api/me/rentals/finish
r.post("/rentals/finish", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const uid = new Types.ObjectId(req.user.id);
  const { rentalId } = req.body;

  const rental = await Rental.findOne({ _id: rentalId, userId: uid });
  if (!rental || rental.status !== "ongoing") return res.sendStatus(404);

  rental.status = "finished";
  rental.endedAt = new Date();
  const minutes = Math.max(1, Math.ceil((+rental.endedAt - +rental.startedAt) / 60000));
  rental.priceCents = minutes * 25;
  await rental.save();

  const invoice = await Invoice.create({
    userId: uid,
    rentalId: rental._id,
    amountCents: rental.priceCents,
    status: "issued",
  });

  res.json({ rental, invoice });
});


// POST /api/me/invoices/:id/pay?method=applepay
r.post("/invoices/:id/pay", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const uid = new Types.ObjectId(req.user.id);

  const methodParam = String(req.query.method ?? 'paypal');
  const simulate = String(req.query.simulate ?? 'true') === 'true';

  const payMethod: PayMethod = METHODS.includes(methodParam as PayMethod)
    ? (methodParam as PayMethod)
    : 'paypal';

  const invoice = await Invoice.findOne({ _id: req.params.id, userId: uid });
  if (!invoice || invoice.status !== "issued") return res.sendStatus(404);

  if (simulate) {
    invoice.status = "paid";
    invoice.method = payMethod;   // ✅ typé
    invoice.paidAt = new Date();
    await invoice.save();
    return res.json({ ok: true, invoice });
  }

  return res.status(400).json({ error: "PSP non branché" });
});


export default r;
