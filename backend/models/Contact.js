module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING
        },
        subject: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('new', 'read', 'replied'),
            defaultValue: 'new'
        }
    });

    return Contact;
};
