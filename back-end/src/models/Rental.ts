// back-end/src/models/Rental.ts
import { Schema, model } from "mongoose";

const RentalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  scooterId: { type: String, required: true },
  status: { type: String, enum: ["ongoing","finished","cancelled"], default: "ongoing", index: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  priceCents: { type: Number, default: 0 }
},{ timestamps:true });

RentalSchema.index({ userId: 1, createdAt: -1 });
export default model("Rental", RentalSchema);
