import express from "express";
import { 
    registerDonor, 
    getAllDonors, 
    getDonorsByBloodGroup,
    updateDonorAvailability,
    getDonorProfile
} from "../controllers/donor.controller.js";
import protection from "../middleware/protection.js";

const router = express.Router();

// All routes are protected - require authentication
router.use(protection);

// Register as a donor
router.post("/register", registerDonor);

// Get all donors
router.get("/all", getAllDonors);

// Get donors by blood group
router.get("/bloodgroup/:bloodGroup", getDonorsByBloodGroup);

// Update donor availability
router.patch("/availability/:donorId", updateDonorAvailability);

// Get donor's own profile
router.get("/profile", getDonorProfile);

export default router;
