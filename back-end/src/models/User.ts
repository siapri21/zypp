// back-end/src/models/User.ts
import { Schema, model } from "mongoose";

const paymentMethod = new Schema(
  {
    provider: { type: String, enum: ["card", "paypal", "applepay"], required: true },
    label: String,
    last4: String,
    token: String,
  },
  { _id: true }
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String },
    passwordHash: { type: String, required: true },
    paymentMethods: [paymentMethod],
  },
  { timestamps: true }
);

// masque les champs sensibles et normalise l'id
userSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  },
});

export default model("User", userSchema);
