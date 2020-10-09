import api from './api';

class AuthService {
    createUser      = async (data: any) => api.post(`/signup`, data)
    SignIn          = async (data: any) => api.post(`/login`, data)
    resetPassword   = async (data: any) => api.post(`/resetpassword`, data)

}

export default new AuthService()