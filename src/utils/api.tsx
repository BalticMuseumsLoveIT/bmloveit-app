import userStore from 'utils/store/userStore';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${userStore.getToken()}`,
  },
});

abstract class Api {
  public static async getRoutes(): Promise<any> {
    try {
      const response = await axiosInstance.get('route/');
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getRoute(id: number): Promise<any> {
    try {
      const response = await axiosInstance.get(`route/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getLocationsForRoute(id: number): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `locations/?location_routes__route__id=${id}`,
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getLocation(id: number): Promise<any> {
    try {
      const response = await axiosInstance.get(`locations/?id=${id}`);

      // api returns array with one element
      return response.data[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Api;
