// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 5000, // ajusta el tiempo de espera según tu necesidad
});

// Interceptor para agregar el token de autorización a todas las solicitudes salientes
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // obtén el token de tu almacenamiento local o de donde lo tengas guardado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;