// threadservice.js

import axiosInstance from '../interceptor/tokenInterceptor';

const threadService = {
  // Método para obtener todos los vehículos
  getAllThreads: async () => {
    try {
      const response = await axiosInstance.get('/threads');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      return [];
    }
  },
  // Método para obtener un vehículo por su ID
  getThreadById: async (id) => {
    try {
      const response = await axiosInstance.get(`/threads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el vehículo con ID ${id}:`, error);
      return null;
    }
  },
  // Método para agregar un nuevo vehículo
  addThread: async (newThread) => {
    try {
      const response = await axiosInstance.post('/threads', newThread);
      return response.data;
    } catch (error) {
      console.error('Error al agregar un nuevo hilo:', error);
      return null;
    }
  },
  // Método para actualizar un vehículo existente
  updateThread: async (id, updatedThread) => {
    try {
      const response = await axiosInstance.put('/threads', updatedThread);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el hilo con ID ${id}:`, error);
      return null;
    }
  },
  // Método para eliminar un vehículo
  deleteThread: async (id) => {
    try {
      const response = await axiosInstance.delete(`/threads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el hilo con ID ${id}:`, error);
      return null;
    }
  },

  closeThread: async (id) => {
    try {
        const response = await axiosInstance.patch(`/threads/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error al cerrar el hilo con ID ${id}:`, error);
        return null;
      }
  },

  
};

export default threadService;