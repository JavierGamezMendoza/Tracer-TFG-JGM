// threadservice.js

import axiosInstance from '../interceptor/tokenInterceptor';

const UserService = {

  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return [];
    }
  },
  // Método para obtener un vehículo por su ID
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
      return null;
    }
  },

  updateUser: async (id, newUser) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, newUser);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
      return null;
    }
  },

  followVehicle: async (id) => {
    try {
      const response = await axiosInstance.patch(`/users/follow/vehicle/${id}`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(`Error al seguir el vehiculo con ID ${id}:`, error);
      return null;
    }
  },

  unFollowVehicle: async (id) => {
    try {
      const response = await axiosInstance.patch(`/users/unfollow/vehicle/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al dejar de seguir el vehiculo con ID ${id}:`, error);
      return null;
    }
  },

  followThread: async (id) => {
    try {
      const response = await axiosInstance.patch(`/users/follow/thread/${id}`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(`Error al seguir el hilo con ID ${id}:`, error);
      return null;
    }
  },

  unFollowThread: async (id) => {
    try {
      const response = await axiosInstance.patch(`/users/unfollow/thread/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al dejar de seguir el hilo con ID ${id}:`, error);
      return null;
    }
  },

  blockUser: async (id) => {
    try {
      const response = await axiosInstance.patch(`/users/block/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al bloquear al usuario con ID ${id}:`, error);
      return null;
    }
  },

  unBlockUser: async (id) => {
    try {
      const response = await axiosInstance.patch(`/users/unblock/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al desbloquear al usuario con ID ${id}:`, error);
      return null;
    }
  },

  getBlockedUsers: async () => {
    try {
      const response = await axiosInstance.get(`/users/blocked`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener los usuarios bloqueados:`, error);
      return null;
    }
  },

  banUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al vetar al usuario con ID ${id}:`, error);
      return null;
    }
  },
};

export default UserService;