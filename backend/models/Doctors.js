const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    qualifications: [{
        degree: String,
        institute: String,
        year: Number
    }],
    experience: {
        type: Number, // in years
        required: true
    },
    consultationFee: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        trim: true
    },
    schedule: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: String,
        endTime: String,
        isAvailable: {
            type: Boolean,
            default: true
        }
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    patientsCount: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    documents: [{
        name: String,
        url: String,
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);