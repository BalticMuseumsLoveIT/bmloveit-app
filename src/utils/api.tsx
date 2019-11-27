import userStore from 'utils/store/userStore';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

abstract class Api {
  public static async signIn(
    provider: string,
    accessToken: string,
  ): Promise<any> {
    try {
      const body = {
        grant_type: 'convert_token',
        client_id: process.env.REACT_APP_CLIENT_ID,
        backend: provider,
        token: accessToken,
      };

      const response = await axiosInstance.post(
        'auth/convert-token',
        JSON.stringify(body),
      );

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getRoutes(): Promise<any> {
    try {
      const response = await axiosInstance.get('api/route/', {
        headers: {
          Authorization: `Bearer ${userStore.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getRoute(id: number): Promise<any> {
    try {
      const response = await axiosInstance.get(`api/route/${id}`, {
        headers: {
          Authorization: `Bearer ${userStore.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getLocationsForRoute(id: number): Promise<any> {
    try {
      const response = await axiosInstance.get(
        `api/locations/?location_routes__route__id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${userStore.getToken()}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getLocation(id: number): Promise<any> {
    try {
      const response = await axiosInstance.get(`api/locations/?id=${id}`, {
        headers: {
          Authorization: `Bearer ${userStore.getToken()}`,
        },
      });

      // api returns array with one element
      return response.data[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Api;
