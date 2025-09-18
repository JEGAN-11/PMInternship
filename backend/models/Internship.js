import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  skills: [String],
  location: String,
  duration: String,
  organization: String,
  capacity: { type: Number, default: 1 },
  scrapedFrom: String,
  sourceUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Internship", internshipSchema);
