const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null],
        default: null
    },
    height: {
        type: Number // in cm
    },
    weight: {
        type: Number // in kg
    },
    allergies: [{
        type: String,
        trim: true
    }],
    medicalHistory: [{
        condition: String,
        diagnosedDate: Date,
        status: String,
        notes: String
    }],
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String,
        email: String
    },
    insurance: {
        provider: String,
        policyNumber: String,
        expiryDate: Date
    }
}, {
    timestamps: true
});

// Calculate age virtual field
patientSchema.virtual('age').get(function() {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
});

module.exports = mongoose.model('Patient', patientSchema);