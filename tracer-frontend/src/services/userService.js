// threadservice.js

import axiosInstance from '../interceptor/tokenInterceptor';

const UserService = {

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
      }
};

export default UserService;