import axios from 'axios';

const API = axios.create({
    baseURL: 'https://smart-learner-backend.onrender.com/api',
    withCredentials: true,
});

// Automatically add token to headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
