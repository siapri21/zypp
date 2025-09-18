import { Schema, model } from "mongoose";
const user = new Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
}, { timestamps: true });
export default model("User", user);
//# sourceMappingURL=User.js.map