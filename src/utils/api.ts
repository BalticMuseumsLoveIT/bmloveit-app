import userStore from 'utils/store/userStore';
import axios from 'axios';
import { RouteInterface, SignInResponseInterface } from './interfaces';

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
  ): Promise<SignInResponseInterface> {
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
  }

  public static async getRoutes(): Promise<Array<RouteInterface>> {
    const response = await axiosInstance.get('api/route/', {
      headers: {
        Authorization: `Bearer ${userStore.getToken()}`,
      },
    });

    return response.data;
  }

  public static async getRoute(id: number): Promise<RouteInterface> {
    const response = await axiosInstance.get(`api/route/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.getToken()}`,
      },
    });

    return response.data;
  }
}

export default Api;
