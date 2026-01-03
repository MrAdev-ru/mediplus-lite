const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// @route   POST api/appointments
// @desc    Book an appointment
// @access  Private (or Public if we remove auth middleware)
router.post('/', auth, appointmentController.bookAppointment);

// @route   GET api/appointments
// @desc    Get all appointments
// @access  Private
router.get('/', auth, appointmentController.getAllAppointments);

module.exports = router;
