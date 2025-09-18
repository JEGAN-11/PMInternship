// routes/users.js
import express from "express";
import { getMe, updateProfile } from "../controllers/userController.js";
import auth from "../middleware/auth.js"; // your auth middleware file

const router = express.Router();

router.get("/me", auth, getMe);       // GET logged-in user
router.put("/me", auth, updateProfile); // UPDATE logged-in user

export default router;
