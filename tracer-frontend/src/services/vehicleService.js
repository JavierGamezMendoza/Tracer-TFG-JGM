// vehicleService.js

import axiosInstance from '../interceptor/tokenInterceptor';

const vehicleService = {
  // Método para obtener todos los vehículos
  getAllVehicles: async () => {
    try {
      const response = await axiosInstance.get('/vehicles');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      return [];
    }
  },
  // Método para obtener un vehículo por su ID
  getVehicleById: async (id) => {
    try {
      const response = await axiosInstance.get(`/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el vehículo con ID ${id}:`, error);
      return null;
    }
  },
  // Método para agregar un nuevo vehículo
  addVehicle: async (newVehicle) => {
    try {
      const response = await axiosInstance.post('/vehicles', newVehicle);
      return response.data;
    } catch (error) {
      console.error('Error al agregar un nuevo vehículo:', error);
      return null;
    }
  },
  // Método para actualizar un vehículo existente
  updateVehicle: async (id, updatedVehicle) => {
    try {
      const response = await axiosInstance.put('/vehicles', updatedVehicle);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el vehículo con ID ${id}:`, error);
      return null;
    }
  },
  // Método para eliminar un vehículo
  deleteVehicle: async (id) => {
    try {
      const response = await axiosInstance.delete('/vehicles');
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el vehículo con ID ${id}:`, error);
      return null;
    }
  },

  
};

export default vehicleService;