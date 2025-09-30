// back-end/src/models/Invoice.ts
import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  description: String,
  qty: Number,
  unitPrice: Number,
});

const InvoiceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  rentalId: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
  amountCents: { type: Number, required: true },
  currency: { type: String, default: "EUR" },
  status: { type: String, enum: ["draft","issued","paid","void"], default: "issued", index: true },
  method: { type: String, enum: ["paypal","applepay","card","none"], default: "none" },
  paidAt: Date,
  items: [ItemSchema],
},{ timestamps:true });

InvoiceSchema.index({ userId: 1, createdAt: -1 });
export default model("Invoice", InvoiceSchema);
