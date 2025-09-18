import express from "express";
import Internship from "../models/Internship.js";
import auth from "../middleware/auth.js";
import Application from "../models/Application.js";

const router = express.Router();

// --- MOCK DATA ---
const mockInternships = [
  {
    title: "AI Research Intern",
    description: "Work on AI/ML models for smart allocation.",
    skills: ["Python", "Machine Learning", "NLP"],
    location: "Remote",
    duration: "3 months",
    organization: "MoCA"
  },
  {
    title: "Web Development Intern",
    description: "Frontend + backend development for portal.",
    skills: ["React", "Node.js", "MongoDB"],
    location: "Delhi",
    duration: "2 months",
    organization: "MoCA"
  }
];

// SEED route (just to insert mock data once)
router.post("/seed", async (req, res) => {
  try {
    await Internship.deleteMany(); // clear old data
    const inserted = await Internship.insertMany(mockInternships);
    res.json({ message: "Mock internships inserted", data: inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single internship
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// APPLY (protected)
router.post("/:id/apply", auth, async (req, res) => {
  try {
    const application = new Application({
      user: req.user.id,
      internship: req.params.id
    });

    await application.save();

    res.json({ message: "Application submitted", application });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ error: err.message });
  }
});



export default router;


/*import express from "express";
import Internship from "../models/Internship.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all internships (public)
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single internship
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE internship (admin only) - optional manual endpoint
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const intern = new Internship(req.body);
    await intern.save();
    res.status(201).json(intern);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (admin)
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const updated = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
*/