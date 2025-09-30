// scripts/seed.ts
import mongoose, { Types } from "mongoose";
import "dotenv/config";
import User from "../src/models/User";
import Rental from "../src/models/Rental";
import Invoice from "../src/models/Invoice";

const METHODS = ['paypal','applepay','card','none'] as const;
type PayMethod = typeof METHODS[number];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const email = "siapriouattara@gmail.com";
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, name: "Demo", passwordHash: "x" });
  }
  const uid = user._id as Types.ObjectId;

  // reset
  await Promise.all([
    Rental.deleteMany({ userId: uid }),
    Invoice.deleteMany({ userId: uid }),
  ]);

  const now = Date.now();

  // 4 locations finies + factures payées
  for (let i = 0; i < 4; i++) {
    const startedAt = new Date(now - (i + 1) * 86400000 + 9 * 3600000);
    const durationMin = 8 + i * 4; // 8,12,16,20
    const endedAt = new Date(+startedAt + durationMin * 60000);
    const priceCents = durationMin * 25;

    const rental = await Rental.create({
      userId: uid,
      scooterId: `SCTR-${100 + i}`,
      status: "finished",
      startedAt,
      endedAt,
      priceCents,
    });

    await Invoice.create({
      userId: uid,
      rentalId: rental._id,
      amountCents: priceCents,
      currency: "EUR",
      status: "paid",
      method: (i % 2 ? "paypal" : "applepay") as PayMethod,
      paidAt: endedAt,
      items: [{ description: "Location trottinette", qty: durationMin, unitPrice: 25 }],
    });
  }

  // 1 location en cours non facturée
  await Rental.create({
    userId: uid,
    scooterId: `SCTR-999`,
    status: "ongoing",
    startedAt: new Date(now - 7 * 60000),
    priceCents: 0,
  });

  console.log("Seed OK pour", email);
  await mongoose.disconnect();
}
run().catch(e => { console.error(e); process.exit(1); });
