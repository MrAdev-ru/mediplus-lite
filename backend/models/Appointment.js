module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING
        },
        department: { /* Added department as it's often in appointment forms */
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
            defaultValue: 'pending'
        },
        notes: {
            type: DataTypes.TEXT
        }
    });

    return Appointment;
};
