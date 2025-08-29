import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    lastDonation: {
        type: Date
    },
    availability: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
