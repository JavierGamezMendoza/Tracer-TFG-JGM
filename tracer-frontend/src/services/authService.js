import axiosInstance from '../interceptor/tokenInterceptor';
import { jwtDecode } from 'jwt-decode';

const AuthService = {
    // Método para iniciar sesión
    login: async (user) => {
        try {
            const response = await axiosInstance.post('/auth/signin', user);
            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw new Error('Error al iniciar sesión');
        }
    },

    // Método para registrar usuario
    register: async (user) => {
        try {
            const response = await axiosInstance.post('/auth/signup', user);
            return response.data;
        } catch (error) {
            console.error('Error al registrar:', error);
            throw new Error('Error al registrar');
        }
    },

    // Método para cerrar sesión
    logout: async () => {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw new Error('Error al cerrar sesión');
        }
    },

    // Método para obtener el usuario actual desde el token
    getCurrentUser: () => {
        try {
            const token = localStorage.getItem('token');
            return jwtDecode(token);
        } catch (error) {
            console.error('Error al obtener al usuario:', error);
            throw new Error('Error al obtener al usuario');
        }
    }
};

export default AuthService;
