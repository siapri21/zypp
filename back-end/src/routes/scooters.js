import { Router } from "express";
import Scooter from "../models/scooters";
const r = Router();
r.get("/", async (_req, res) => res.json(await Scooter.find().lean()));
r.post("/", async (req, res) => {
    const { lat, lng, battery } = req.body;
    const s = await Scooter.create({ lat, lng, battery });
    res.status(201).json(s);
});
r.get("/:id", async (req, res) => {
    const s = await Scooter.findById(req.params.id);
    if (!s)
        return res.sendStatus(404);
    res.json(s);
});
r.delete("/:id", async (req, res) => {
    await Scooter.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});
export default r;
//# sourceMappingURL=scooters.js.map