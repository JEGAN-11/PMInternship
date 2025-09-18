import express from "express";
import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Apply to internship (student)
router.post("/apply/:internshipId", auth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    // check if user already applied
    const existing = await Application.findOne({ user: req.user.id, internship: internship._id });
    if (existing) return res.status(400).json({ message: "Already applied" });

    const application = new Application({ user: req.user.id, internship: internship._id });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get my applications (student)
router.get("/my", auth, async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id }).populate("internship");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: list all applications
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const apps = await Application.find().populate("user", "name email").populate("internship", "title organization");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
