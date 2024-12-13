// threadservice.js

import axiosInstance from '../interceptor/tokenInterceptor';

const threadpostService = {
  // Método para obtener todos los vehículos
  getAllThreadposts: async () => {
    try {
      const response = await axiosInstance.get('/threadposts');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      return [];
    }
  },
  // Método para obtener un vehículo por su ID
  getThreadpostById: async (id) => {
    try {
      const response = await axiosInstance.get(`/threadposts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el vehículo con ID ${id}:`, error);
      return null;
    }
  },
  // Método para agregar un nuevo vehículo
  addThreadpost: async (newThreadpost) => {
    try {
      const response = await axiosInstance.post('/threadposts', newThreadpost);
      return response.data;
    } catch (error) {
      console.error('Error al agregar un nuevo vehículo:', error);
      return null;
    }
  },
  // Método para actualizar un vehículo existente
  updateThreadpost: async (id, updatedThreadpost) => {
    try {
      const response = await axiosInstance.put('/threadposts', updatedThreadpost);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el vehículo con ID ${id}:`, error);
      return null;
    }
  },
  // Método para eliminar un vehículo
  deleteThreadpost: async (id) => {
    try {
      const response = await axiosInstance.delete(`/threadposts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el vehículo con ID ${id}:`, error);
      return null;
    }
  }
};

export default threadpostService;