class FamilyMedAPI {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.token = localStorage.getItem('token');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Remove token (logout)
    removeToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Get headers for API requests
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Handle API response
    async handleResponse(response) {
        const data = await response.json();
        
        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Something went wrong',
                errors: data.errors
            };
        }

        return data;
    }

    // ========== AUTHENTICATION ==========
    async register(userData) {
        const response = await fetch(`${this.baseURL}/auth/register`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(userData)
        });

        const data = await this.handleResponse(response);
        
        if (data.success && data.data.token) {
            this.setToken(data.data.token);
        }

        return data;
    }

    async login(credentials) {
        const response = await fetch(`${this.baseURL}/auth/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials)
        });

        const data = await this.handleResponse(response);
        
        if (data.success && data.data.token) {
            this.setToken(data.data.token);
        }

        return data;
    }

    async getCurrentUser() {
        const response = await fetch(`${this.baseURL}/auth/me`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async updateProfile(profileData) {
        const response = await fetch(`${this.baseURL}/auth/profile`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(profileData)
        });

        return this.handleResponse(response);
    }

    async changePassword(passwordData) {
        const response = await fetch(`${this.baseURL}/auth/change-password`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(passwordData)
        });

        return this.handleResponse(response);
    }

    async logout() {
        const response = await fetch(`${this.baseURL}/auth/logout`, {
            method: 'POST',
            headers: this.getHeaders()
        });

        this.removeToken();
        return this.handleResponse(response);
    }

    // ========== APPOINTMENTS ==========
    async createAppointment(appointmentData) {
        const response = await fetch(`${this.baseURL}/appointments`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(appointmentData)
        });

        return this.handleResponse(response);
    }

    async getAppointments(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.baseURL}/appointments?${queryString}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async getAppointment(id) {
        const response = await fetch(`${this.baseURL}/appointments/${id}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async updateAppointment(id, updateData) {
        const response = await fetch(`${this.baseURL}/appointments/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(updateData)
        });

        return this.handleResponse(response);
    }

    async cancelAppointment(id) {
        const response = await fetch(`${this.baseURL}/appointments/${id}/cancel`, {
            method: 'PUT',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    // ========== DOCTORS ==========
    async getDoctors(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.baseURL}/doctors?${queryString}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async getDoctor(id) {
        const response = await fetch(`${this.baseURL}/doctors/${id}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async getDoctorSchedule(id, date) {
        const response = await fetch(`${this.baseURL}/doctors/${id}/schedule?date=${date}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    // ========== PATIENTS ==========
    async getPatients(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.baseURL}/patients?${queryString}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async getPatient(id) {
        const response = await fetch(`${this.baseURL}/patients/${id}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async getPatientMedicalHistory(id) {
        const response = await fetch(`${this.baseURL}/patients/${id}/medical-history`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    // ========== PRESCRIPTIONS ==========
    async createPrescription(prescriptionData) {
        const response = await fetch(`${this.baseURL}/prescriptions`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(prescriptionData)
        });

        return this.handleResponse(response);
    }

    async getPrescriptions(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.baseURL}/prescriptions?${queryString}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    // ========== SERVICES ==========
    async getServices(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.baseURL}/services?${queryString}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    // ========== ADMIN ==========
    async getDashboardStats() {
        const response = await fetch(`${this.baseURL}/admin/dashboard-stats`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async getAllUsers(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${this.baseURL}/admin/users?${queryString}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse(response);
    }

    async updateUserStatus(id, status) {
        const response = await fetch(`${this.baseURL}/admin/users/${id}/status`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ status })
        });

        return this.handleResponse(response);
    }

    // ========== FILE UPLOAD ==========
    async uploadFile(file, type) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const response = await fetch(`${this.baseURL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
            body: formData
        });

        return this.handleResponse(response);
    }
}

// Create global API instance
window.FamilyMedAPI = new FamilyMedAPI();