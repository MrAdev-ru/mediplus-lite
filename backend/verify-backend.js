const fetch = require('node-fetch'); // You might need to install node-fetch if using older node, or use native fetch in node 18+

const BASE_URL = 'http://localhost:5000/api';

async function testBackend() {
    console.log('--- Starting Backend Verification ---');

    try {
        // 1. Register User
        console.log('\n1. Testing Registration...');
        const registerRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Patient',
                email: 'test' + Date.now() + '@example.com',
                password: 'password123',
                phone: '1234567890',
                dob: '1990-01-01',
                gender: 'male'
            })
        });
        const registerData = await registerRes.json();
        console.log('Status:', registerRes.status);
        if (registerRes.status !== 200) {
            console.error('Registration Failed:', registerData);
            return;
        }
        console.log('Registration Success! Token received.');
        const token = registerData.token;

        // 2. Login User
        console.log('\n2. Testing Login...');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: registerData.user.email,
                password: 'password123'
            })
        });
        const loginData = await loginRes.json();
        console.log('Status:', loginRes.status);
        if (loginRes.status !== 200) console.error('Login Failed:', loginData);
        else console.log('Login Success!');

        // 3. Book Appointment
        console.log('\n3. Testing Appointment Booking...');
        const apptRes = await fetch(`${BASE_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                date: '2023-12-25',
                time: '10:00 AM',
                reason: 'General Checkup',
                department: 'General'
            })
        });
        const apptData = await apptRes.json();
        console.log('Status:', apptRes.status);
        console.log('Appointment:', apptData);

        // 4. Submit Contact Form
        console.log('\n4. Testing Contact Form...');
        const contactRes = await fetch(`${BASE_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Visitor',
                email: 'visitor@example.com',
                phone: '9876543210',
                subject: 'Inquiry',
                message: 'Hello, do you accept insurance?'
            })
        });
        const contactData = await contactRes.json();
        console.log('Status:', contactRes.status);
        console.log('Response:', contactData);

        console.log('\n--- Verification Complete ---');

    } catch (err) {
        console.error('Test Failed:', err);
    }
}

// Check if node-fetch is available (for Node < 18) or use global fetch
if (!global.fetch) {
    console.log('Note: This script requires Node.js v18+ or "node-fetch" package.');
}

testBackend();
