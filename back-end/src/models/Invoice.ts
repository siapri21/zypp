// back-end/src/models/Invoice.ts
import { Schema, model } from "mongoose";


const itemSchema = new Schema({
description: String,
qty: Number,
unitPrice: Number,
});


const invoiceSchema = new Schema(
{
userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
amount: { type: Number, required: true },
status: { type: String, enum: ["paid", "open", "void"], default: "paid" },
provider: { type: String, enum: ["card", "paypal", "applepay"], required: true },
items: [itemSchema],
},
{ timestamps: true }
);


export default model("Invoice", invoiceSchema);