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
