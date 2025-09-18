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
    height: {
        type: Number,
        required: true,
        min: 140,
        max: 220,
        validate: {
            validator: function(value) {
                if (!this.weight) return true; // Skip BMI validation if weight is not set
                const heightInMeters = value / 100;
                const bmi = this.weight / (heightInMeters * heightInMeters);
                return bmi >= 18.5 && bmi <= 35;
            },
            message: props => {
                const heightInMeters = props.value / 100;
                const bmi = this.weight / (heightInMeters * heightInMeters);
                return `BMI (${bmi.toFixed(1)}) is out of range. Must be between 18.5 and 35.`;
            }
        }
    },
    weight: {
        type: Number,
        required: true,
        min: 45,
        max: 150,
        validate: {
            validator: function(value) {
                if (!this.height) return true; // Skip BMI validation if height is not set
                const heightInMeters = this.height / 100;
                const bmi = value / (heightInMeters * heightInMeters);
                return bmi >= 18.5 && bmi <= 35;
            },
            message: props => {
                const heightInMeters = this.height / 100;
                const bmi = props.value / (heightInMeters * heightInMeters);
                return `BMI (${bmi.toFixed(1)}) is out of range. Must be between 18.5 and 35.`;
            }
        }
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
        type: Date,
        validate: {
            validator: function(date) {
                if (!date) return true; // Allow null for first-time donors
                
                const today = new Date();
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(today.getMonth() - 3);
                
                return date <= today && date < threeMonthsAgo;
            },
            message: 'You must wait at least 3 months between donations. Please try registering after your cooling period.'
        }
    },
    availability: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hasHealthIssues: {
        type: Boolean,
        required: true,
        default: false
    },
    healthIssues: {
        type: String,
        validate: {
            validator: function(value) {
                if (this.hasHealthIssues === true) {
                    return value && value.trim().length > 0;
                }
                return true;
            },
            message: 'Please describe your health issues'
        },
        trim: true,
        default: ''
    }
}, { timestamps: true });

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
