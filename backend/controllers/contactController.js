const db = require('../models');
const Contact = db.Contact;

exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const newContact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message
        });

        res.json({ msg: 'Message sent successfully', contact: newContact });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
