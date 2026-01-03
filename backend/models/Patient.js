module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        dob: {
            type: DataTypes.DATEONLY
        },
        gender: {
            type: DataTypes.STRING
        },
        bloodGroup: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.TEXT
        },
        emergencyName: {
            type: DataTypes.STRING
        },
        emergencyPhone: {
            type: DataTypes.STRING
        },
        allergies: {
            type: DataTypes.TEXT
        },
        medications: {
            type: DataTypes.TEXT
        },
        medicalHistory: {
            type: DataTypes.TEXT
        }
    });

    return Patient;
};
