// models/userModel.js
import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    sprovid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Sprovider = mongoose.model("Sprovider", providerSchema);
export default Sprovider;
