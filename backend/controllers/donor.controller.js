import Donor from "../models/donor.model.js";

// Register a new donor
export const registerDonor = async (req, res) => {
    try {
        const { 
            fullName, email, phone, age, gender, bloodGroup, height, weight,
            city, state, country, address
        } = req.body;

        // Add the logged-in user's ID to the donor data
        const userId = req.user._id;

        // Check if donor with this email already exists
        const existingDonor = await Donor.findOne({ email });
        if (existingDonor) {
            return res.status(400).json({ error: "A donor with this email already exists" });
        }

        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Validate BMI
        if (bmi < 18.5 || bmi > 35) {
            return res.status(400).json({ 
                error: `BMI (${bmi.toFixed(1)}) is out of range. Must be between 18.5 and 35.`
            });
        }

        // Create new donor
        const newDonor = new Donor({
            fullName,
            email,
            phone,
            age,
            gender,
            bloodGroup,
            height,
            weight,
            city,
            state,
            country,
            address,
            userId
        });

        // Save donor to database
        await newDonor.save();

        res.status(201).json({
            message: "Donor registered successfully",
            donor: newDonor
        });

    } catch (error) {
        console.error("Error in registerDonor: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all donors
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find()
            .select("-__v")
            .sort({ createdAt: -1 });
        
        res.status(200).json(donors);
    } catch (error) {
        console.error("Error in getAllDonors: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get donors by blood group
export const getDonorsByBloodGroup = async (req, res) => {
    try {
        const { bloodGroup } = req.params;
        
        const donors = await Donor.find({ bloodGroup, availability: true })
            .select("-__v")
            .sort({ createdAt: -1 });

        res.status(200).json(donors);
    } catch (error) {
        console.error("Error in getDonorsByBloodGroup: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update donor availability
export const updateDonorAvailability = async (req, res) => {
    try {
        const { donorId } = req.params;
        const { availability } = req.body;

        const donor = await Donor.findById(donorId);
        
        if (!donor) {
            return res.status(404).json({ error: "Donor not found" });
        }

        // Check if the logged-in user owns this donor profile
        if (donor.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Not authorized to update this donor" });
        }

        donor.availability = availability;
        if (!availability) {
            donor.lastDonation = new Date();
        }

        await donor.save();

        res.status(200).json({
            message: "Donor availability updated successfully",
            donor
        });

    } catch (error) {
        console.error("Error in updateDonorAvailability: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get donor profile
export const getDonorProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const donor = await Donor.findOne({ userId })
            .select("-__v");

        if (!donor) {
            return res.status(404).json({ error: "Donor profile not found" });
        }

        res.status(200).json(donor);
    } catch (error) {
        console.error("Error in getDonorProfile: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
