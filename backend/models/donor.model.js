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
