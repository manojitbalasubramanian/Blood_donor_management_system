import express from "express"
import {signup,login,logout,updateProfile} from "../controllers/auth.controller.js"

const router = express.Router();


import { protect } from "../middleware/protection.js";

router.post("/login",login);
router.post("/logout",logout);
router.post("/signup",signup);

// Update own user profile
router.put("/profile", protect, updateProfile);

export default router;