const db = require('../models');
const Appointment = db.Appointment;
const Doctor = db.Doctor;
const Patient = db.Patient;
const User = db.User;

exports.bookAppointment = async (req, res) => {
    try {
        // Assume req.user.id is available from auth middleware
        // For public booking (if allowed), logic would be different. 
        // Assuming logged in user for now as typical for robust systems, 
        // or getting patient details from body if public. 
        // Given 'patient-register' exists, likely logged in flow preferred.

        const { doctorId, date, time, reason, department } = req.body;

        let patientId = null;
        if (req.user) {
            const patient = await Patient.findOne({ where: { userId: req.user.id } });
            if (patient) patientId = patient.id;
        }

        const appointment = await Appointment.create({
            patientId, // Nullable if guest booking allowed, or enforce auth
            doctorId: doctorId || null, // Nullable if general booking
            date,
            time,
            reason,
            department,
            status: 'pending'
        });

        res.json(appointment);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        // Admin or Doctor viewing appointments
        const appointments = await Appointment.findAll({
            include: [
                { model: Patient, include: [User] }, // Get Patient info including Name from User model
                { model: Doctor, include: [User] }   // Get Doctor info
            ]
        });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
