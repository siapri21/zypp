// back-end/src/models/Rental.ts
import { Schema, model, Types } from "mongoose";


const rentalSchema = new Schema(
{
userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
scooterId: { type: String, required: true },
startedAt: { type: Date, required: true },
endedAt: { type: Date },
price: { type: Number, default: 0 }
},
{ timestamps: true }
);


export default model("Rental", rentalSchema);