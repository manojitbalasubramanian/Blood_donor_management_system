
// Admin delete user
export const deleteUserByAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
// Get all users (for admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-__v');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get statistics for the home page
export const getStatistics = async (req, res) => {
    try {
        const donorCount = await User.countDocuments();
        const uniqueCities = await User.distinct('city');
        const recipientCount = await Recipient.countDocuments();

        res.status(200).json({
            totalDonors: donorCount,
            totalLivesSaved: recipientCount * 3, // Assuming each donation helps 3 lives
            citiesCovered: uniqueCities.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
// Admin create user
export const createUserByAdmin = async (req, res) => {
    try {
        const { fullname, username, email, password, gender, bloodgroup, city, phone, age, address, admin, state } = req.body;
        if (!fullname || !username || !email || !password || !gender || !bloodgroup || !city || !phone || !age) {
            return res.status(400).json({ error: "Please fill all required fields" });
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
            gender,
            bloodgroup,
            city,
            phone,
            age,
            address,
            admin: !!admin,
            state
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
import Recipient from '../models/recipient.model.js';

// Update admin status for a user
export const updateAdminStatus = async (req, res) => {
    const { userId } = req.params;
    const { admin } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { admin }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Admin status updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
