import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthReq extends Request {
user?: { id: string; email: string };
}


export  default function auth(req: AuthReq, res: Response, next: NextFunction) {
const h = req.headers.authorization;
if (!h?.startsWith("Bearer ")) return res.sendStatus(401);
const token = h.slice(7);
try {
const p = jwt.verify(token, process.env.JWT_SECRET!) as any;
req.user = { id: String(p.sub), email: String(p.email) };
next();
} catch {
return res.sendStatus(401);
}
}