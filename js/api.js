const API_BASE_URL = 'http://localhost:5000/api';

const FamilyMedAPI = {
    // Auth
    login: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            return { success: true, data };
        } catch (error) {
            console.error('API Login Error:', error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            return { success: true, data };
        } catch (error) {
            console.error('API Register Error:', error);
            throw error;
        }
    },

    // Contact
    submitContact: async (contactData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            return { success: true, data };
        } catch (error) {
            console.error('API Contact Error:', error);
            throw error;
        }
    },

    // Appointments
    bookAppointment: async (appointmentData, token) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['x-auth-token'] = token;
            }

            const response = await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(appointmentData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || data.message || 'Booking failed');
            }

            return { success: true, data };
        } catch (error) {
            console.error('API Appointment Error:', error);
            throw error;
        }
    }
};

// Export for module systems, or attach to window for vanilla
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FamilyMedAPI;
} else {
    window.FamilyMedAPI = FamilyMedAPI;
}