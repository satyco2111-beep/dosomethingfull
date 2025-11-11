// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    suid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Suser = mongoose.model("Suser", userSchema);
export default Suser;
