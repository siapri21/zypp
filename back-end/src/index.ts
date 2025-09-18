import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import scooters from "./routes/scooters";
import auth from "./routes/auth";
import me from "./routes/Me";
// import authMw from "./middleware/auth";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/scooters", scooters);
app.use("/api/auth", auth);
app.use("/api/me",  me);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

connectDB(process.env.MONGODB_URI!)
  .then(() => app.listen(process.env.PORT || 4000, () => console.log("API ready")))
  .catch((e) => { console.error(e); process.exit(1); });