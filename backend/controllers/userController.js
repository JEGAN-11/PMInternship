import User from "../models/User.js";

// GET profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const { bio, skills, github, linkedin, leetcode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        github,
        linkedin,
        leetcode,
        skills: skills ? skills.split(",").map((s) => s.trim()) : []
      },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};
