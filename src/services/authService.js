import API from './api'

// Resgister a new user
export const registerUser = (data) => API.post('/auth/register', data)

// Login user
export const loginUser = (data) => API.post('/auth/login', data)
