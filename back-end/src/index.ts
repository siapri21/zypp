import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/db.js";          // .js si tu compiles en ESM
import scooters from "./routes/scooters.js";
import auth from "./routes/auth.js";
import me from "./routes/Me.js";

const app = express();

// CORS: autorise ton front Vercel + localhost
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://zypp-ztyy-bwk51ogto-siapri21s-projects.vercel.app" // adapte avec ton vrai domaine
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes principales
app.use("/api/scooters", scooters);
app.use("/api/auth", auth);
app.use("/api/me", me);

// Santé API
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Route racine (utile pour tester Render directement)
app.get("/", (_req, res) => {
  res.send("Zypp API OK 🚀");
});

const PORT = Number(process.env.PORT) || 4000;

connectDB(process.env.MONGODB_URI as string)
  .then(() => app.listen(PORT, () => console.log(`API ready on ${PORT}`)))
  .catch((e) => { console.error(e); process.exit(1); });
