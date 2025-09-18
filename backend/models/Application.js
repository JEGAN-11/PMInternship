import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship", required: true },
  status: { type: String, enum: ["pending", "selected", "rejected"], default: "pending" },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Application", applicationSchema);
