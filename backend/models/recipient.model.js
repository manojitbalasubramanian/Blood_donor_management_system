import mongoose from 'mongoose';

const recipientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    contactNumber: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    unitsNeeded: {
        type: Number,
        required: true,
        min: 1
    },
    urgency: {
        type: String,
        required: true,
        enum: ['Immediate', 'Within 24 hours', 'Within a week']
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Fulfilled', 'Cancelled']
    }
}, {
    timestamps: true
});

const Recipient = mongoose.model('Recipient', recipientSchema);

export default Recipient;
