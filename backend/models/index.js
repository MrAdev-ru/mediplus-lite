const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Patient = require('./Patient')(sequelize, Sequelize);
db.Doctor = require('./Doctor')(sequelize, Sequelize);
db.Appointment = require('./Appointment')(sequelize, Sequelize);
db.Contact = require('./Contact')(sequelize, Sequelize);

// Define associations
// User has one Patient profile or Doctor profile
db.User.hasOne(db.Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Patient.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasOne(db.Doctor, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Doctor.belongsTo(db.User, { foreignKey: 'userId' });

// Appointments
db.Patient.hasMany(db.Appointment, { foreignKey: 'patientId' });
db.Appointment.belongsTo(db.Patient, { foreignKey: 'patientId' });

db.Doctor.hasMany(db.Appointment, { foreignKey: 'doctorId' });
db.Appointment.belongsTo(db.Doctor, { foreignKey: 'doctorId' });

module.exports = db;
