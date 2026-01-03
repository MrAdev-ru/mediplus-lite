const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection and Sync
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('Tables synced...');
    })
    .catch(err => {
        console.log('Error: ' + err);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => {
    res.send('MediPlus Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
