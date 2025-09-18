import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Profile completion fields
  bio: { type: String },
  skills: [{ type: String }],
  github: { type: String },
  linkedin: { type: String },
  leetcode: { type: String }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
