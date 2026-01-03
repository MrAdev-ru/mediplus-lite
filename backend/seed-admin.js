const db = require('./models');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    try {
        await db.sequelize.sync();

        const adminEmail = 'admin@admin.com';
        const existingAdmin = await db.User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log('Admin already exists');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await db.User.create({
            name: 'Super Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            phone: '0000000000'
        });

        console.log('Admin user created: admin@admin.com / admin123');
    } catch (err) {
        console.error('Error seeding admin:', err);
    }
}

seedAdmin();
