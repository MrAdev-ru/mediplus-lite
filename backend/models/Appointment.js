const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        startTime: String,
        endTime: String
    },
    reason: {
        type: String,
        trim: true
    },
    symptoms: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
        default: 'pending'
    },
    type: {
        type: String,
        enum: ['consultation', 'follow-up', 'emergency', 'routine'],
        default: 'consultation'
    },
    notes: {
        type: String,
        trim: true
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    feedback: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Index for faster queries
appointmentSchema.index({ date: 1, doctor: 1 });
appointmentSchema.index({ patient: 1, status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);