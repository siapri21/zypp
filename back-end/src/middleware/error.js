import { Request, Response, NextFunction } from "express";
export function errorHandler(err, _req, res, _next) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || "Server error" });
}
//# sourceMappingURL=error.js.map