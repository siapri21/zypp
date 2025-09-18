import { Schema, model } from "mongoose";
const scooter = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  battery: { type: Number, default: 100 },
  status: { type: String, enum: ["idle","in_use","charging"], default: "idle" },
},{timestamps:true});
export default model("Scooter", scooter);
