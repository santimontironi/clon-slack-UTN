import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const registerService = (data) => {
    return api.post('/api/auth/register', data)
}

export const verifyEmailService = (token) => {
    return api.get(`/api/auth/verify-email/${token}`)
}

export const loginService = (data) => {
    return api.post('/api/auth/login', data)
}

export const dashboardUserService = () => {
    return api.get('/api/auth/dashboard-user')
}

export const logoutUserService = () => {
    return api.post('/api/auth/logout')
}