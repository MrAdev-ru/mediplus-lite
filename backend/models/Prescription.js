const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
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
    diagnosis: {
        type: String,
        required: true,
        trim: true
    },
    medications: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        dosage: {
            type: String,
            required: true
        },
        frequency: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        instructions: {
            type: String,
            trim: true
        }
    }],
    instructions: {
        type: String,
        trim: true
    },
    followUpDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    issuedDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);