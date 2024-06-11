// vehicleService.js

import axiosInstance from '../interceptor/tokenInterceptor';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';


const vehicleService = {

    // Método para obtener todos los vehículos
    login: async (user) => {
        console.log(user)
        try {
            const response = await axiosInstance.post('/auth/signin', user);

            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return [];
        }
    },
    // Método para obtener un vehículo por su ID
    register: async (user) => {
        try {
            const response = await axiosInstance.post(`auth/signup`, user);
            return response.data;
        } catch (error) {
            console.error(`Error al registrar:`, error);
            return null;
        }
    },

    logout: async (user) => {
        try{
            localStorage.removeItem("token");
        } catch (error){
            console.error("Error al obtener al usuario:", error);
            return null;
        }
    },

    getCurrentUser: () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                return jwtDecode(token);
            }
        } catch (error){
            console.error("Error al obtener al usuario:", error);
            return false;
        }
    }
};

export default vehicleService;