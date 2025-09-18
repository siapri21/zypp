// back-end/src/routes/me.ts
import { Router } from "express";
import auth,  {AuthReq}  from "../middleware/auth";
import User from "../models/User";
import Rental from "../models/Rental";
import Invoice from "../models/Invoice";

const r = Router();

// protège toutes les routes /api/me/*
r.use(auth);

// GET /api/me
r.get("/", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const u = await User.findById(req.user.id).lean();
  if (!u) return res.sendStatus(404);
  const { _id, __v, passwordHash, ...rest } = u as any;
  return res.json({ id: String(_id), ...rest });
});

// PATCH /api/me
r.patch("/", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const { name, email } = req.body ?? {};
  const update: any = {};
  if (name != null) update.name = name;
  if (email != null) update.email = email; // peut lever 11000 (duplicate)
  try {
    const u = await User.findByIdAndUpdate(req.user.id, update, { new: true, lean: true });
    if (!u) return res.sendStatus(404);
    const { _id, __v, passwordHash, ...rest } = u as any;
    return res.json({ id: String(_id), ...rest });
  } catch (e: any) {
    if (e?.code === 11000) return res.status(409).json({ error: "email already used" });
    return res.sendStatus(500);
  }
});

// GET /api/me/rentals
r.get("/rentals", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const rs = await Rental.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
  return res.json(rs);
});

// GET /api/me/invoices
r.get("/invoices", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const inv = await Invoice.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
  return res.json(inv);
});

// POST /api/me/payment-methods
r.post("/payment-methods", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const { provider, label, token, last4 } = req.body ?? {};
  if (!provider || !token) return res.status(400).json({ error: "provider and token required" });

  const u = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { paymentMethods: { provider, label, token, last4 } } },
    { new: true, lean: true }
  );
  if (!u) return res.sendStatus(404);
  return res.status(201).json(u.paymentMethods);
});

// DELETE /api/me/payment-methods/:pmid
r.delete("/payment-methods/:pmid", async (req: AuthReq, res) => {
  if (!req.user?.id) return res.sendStatus(401);
  const u = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { paymentMethods: { _id: req.params.pmid } } },
    { new: true, lean: true }
  );
  if (!u) return res.sendStatus(404);
  return res.json(u.paymentMethods);
});

export default r;
