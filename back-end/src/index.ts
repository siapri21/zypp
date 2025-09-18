import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import scooters from "./routes/scooters";
import auth from "./routes/auth";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/scooters", scooters);
app.use("/api/auth", auth);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

connectDB(process.env.MONGODB_URI!)
  .then(() => app.listen(process.env.PORT || 3000, () => console.log("API ready")))
  .catch((e) => { console.error(e); process.exit(1); });
