module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.TEXT
        },
        fees: {
            type: DataTypes.DECIMAL(10, 2)
        },
        availableDays: {
            type: DataTypes.STRING // Storing as comma separated string or JSON if needed, keeping simple for now
        },
        availableTimeStart: {
            type: DataTypes.STRING
        },
        availableTimeEnd: {
            type: DataTypes.STRING
        }
    });

    return Doctor;
};
