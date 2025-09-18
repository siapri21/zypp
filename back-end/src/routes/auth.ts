import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
const r = Router();

r.post("/register", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });
  const hash = await bcrypt.hash(password, 10);
  const u = await User.create({ email, passwordHash: hash });
  res.status(201).json({ id: u.id, email: u.email });
});

r.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const u = await User.findOne({ email });
  if (!u || !(await bcrypt.compare(password, u.passwordHash))) return res.sendStatus(401);
  const token = jwt.sign({ sub: u.id, email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.json({ token });
});

export default r;
