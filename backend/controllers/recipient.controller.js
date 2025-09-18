import Donor from '../models/donor.model.js';
import User from '../models/user.model.js';
import Recipient from '../models/recipient.model.js';

// Get all recipients
export const getAllRecipients = async (req, res) => {
    try {
        const recipients = await Recipient.find({});
        res.status(200).json(recipients);
    } catch (error) {
        console.error('Error fetching recipients:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single recipient by ID
export const getRecipient = async (req, res) => {
    try {
        const recipient = await Recipient.findById(req.params.id);
        if (!recipient) {
            return res.status(404).json({ error: 'Recipient not found' });
        }
        res.status(200).json(recipient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new recipient
export const createRecipient = async (req, res) => {
    try {
        const recipient = await Recipient.create(req.body);
        res.status(201).json(recipient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a recipient
export const updateRecipient = async (req, res) => {
    try {
        const recipient = await Recipient.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );
        if (!recipient) {
            return res.status(404).json({ error: 'Recipient not found' });
        }
        res.status(200).json(recipient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a recipient
export const deleteRecipient = async (req, res) => {
    try {
        const recipient = await Recipient.findByIdAndDelete(req.params.id);
        if (!recipient) {
            return res.status(404).json({ error: 'Recipient not found' });
        }
        res.status(200).json(recipient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Helper function to get compatible blood groups
const getCompatibleBloodGroups = (bloodGroup) => {
    const compatibility = {
        'A+': ['A+', 'A-', 'O+', 'O-'],
        'A-': ['A-', 'O-'],
        'B+': ['B+', 'B-', 'O+', 'O-'],
        'B-': ['B-', 'O-'],
        'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        'AB-': ['A-', 'B-', 'AB-', 'O-'],
        'O+': ['O+', 'O-'],
        'O-': ['O-']
    };
    return compatibility[bloodGroup.toUpperCase()] || [];
};

// Handle recipient blood request
export const handleBloodRequest = async (req, res) => {
    try {
        console.log('Received request body:', req.body); // Debug log


        const {
            name,
            age,
            gender,
            bloodGroup,
            contactNumber,
            hospital,
            city,
            state,
            reason,
            unitsNeeded,
            urgency
        } = req.body;

        // Validate required fields
        if (!name || !bloodGroup || !contactNumber || !city || !state || !hospital || !unitsNeeded) {
            return res.status(400).json({ error: 'Please fill in all required fields' });
        }

        // Convert types and sanitize data
        const sanitizedData = {
            name: name.trim(),
            age: parseInt(age),
            gender: gender,
            bloodGroup: bloodGroup.toUpperCase(),
            contactNumber: contactNumber.trim(),
            hospital: hospital.trim(),
            city: city.trim().toLowerCase(),
            state: state.trim(),
            reason: reason.trim(),
            unitsNeeded: parseInt(unitsNeeded),
            urgency: urgency,
            userId: req.user ? req.user._id : null,
            status: 'Pending'
        };

        console.log('Sanitized data:', sanitizedData); // Debug log

        // Create new recipient request
        const recipientRequest = new Recipient(sanitizedData);

        // Save the request to database
        const savedRequest = await recipientRequest.save();
        console.log('Request saved successfully:', savedRequest); // Debug log

        // Find exact matching donors (same blood group and city)
        const exactMatches = await Donor.find({
            bloodGroup: bloodGroup.toUpperCase(),
            city: city.toLowerCase(),
            isAvailable: true
        }).select('name bloodGroup city contactNumber email age gender lastDonation');

        // Find compatible blood group donors in the same city
        const compatibleBloodGroups = getCompatibleBloodGroups(bloodGroup);
        const compatibleMatches = await Donor.find({
            bloodGroup: { $in: compatibleBloodGroups },
            city: city.toLowerCase(),
            isAvailable: true,
            _id: { $nin: exactMatches.map(d => d._id) } // Exclude exact matches
        }).select('name bloodGroup city contactNumber email age gender lastDonation');

        // Find exact blood group matches in nearby cities
        const exactMatchesOtherCities = await Donor.find({
            bloodGroup: bloodGroup.toUpperCase(),
            city: { $ne: city.toLowerCase() },
            isAvailable: true
        }).select('name bloodGroup city contactNumber email age gender lastDonation')
        .limit(10); // Limit to avoid large response

        console.log(`Found donors - Exact: ${exactMatches.length}, Compatible: ${compatibleMatches.length}, Other Cities: ${exactMatchesOtherCities.length}`);
        
        // Convert Mongoose documents to plain objects with proper formatting
        // Log the raw donor data before formatting
        console.log('Raw donor data before formatting:', {
            exactMatches: exactMatches.length,
            compatibleMatches: compatibleMatches.length,
            otherCityMatches: exactMatchesOtherCities.length
        });

        const formattedResponse = {
            exactMatches: exactMatches.map(donor => ({
                ...donor.toObject(),
                matchType: 'Exact Match - Same City',
                priority: 1
            })),
            compatibleMatches: compatibleMatches.map(donor => ({
                ...donor.toObject(),
                matchType: 'Compatible Match - Same City',
                priority: 2
            })),
            otherCityMatches: exactMatchesOtherCities.map(donor => ({
                ...donor.toObject(),
                matchType: 'Exact Match - Other City',
                priority: 3
            }))
        };

        return res.status(200).json({
            success: true,
            requestId: savedRequest._id,
            matchingDonors: formattedResponse,
            totalMatches: exactMatches.length + compatibleMatches.length + exactMatchesOtherCities.length,
            message: exactMatches.length > 0 
                ? `Found ${exactMatches.length} exact matches in your city!`
                : compatibleMatches.length > 0
                    ? `Found ${compatibleMatches.length} compatible donors in your city!`
                    : exactMatchesOtherCities.length > 0
                        ? `Found ${exactMatchesOtherCities.length} matches in other cities`
                        : 'No matching donors found currently'
        });

    } catch (error) {
        console.error('Blood request error:', error);
        
        // Send more specific error messages
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Validation Error', 
                details: Object.values(error.errors).map(err => err.message)
            });
        }
        
        // Database connection errors
        if (error.name === 'MongoError' || error.name === 'MongooseError') {
            return res.status(503).json({ 
                error: 'Database Error',
                message: 'Unable to process your request at this time'
            });
        }
        
        return res.status(500).json({ 
            error: 'Internal Server Error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
        });
    }
};
