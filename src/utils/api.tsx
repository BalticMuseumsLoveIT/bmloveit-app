import userStore from 'utils/store/userStore';
import axios from 'axios';
import {
  QuizDetailsInterface,
  QuizDetailsNotFound,
  QuizInterface,
} from './interfaces';

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

  /**
   * Get list of all active quizzes.
   * Response will not include questions.
   *
   * @throws Axios error
   */
  public static async getQuizList(): Promise<QuizInterface[]> {
    const response = await axiosInstance.get('quiz');
    return response.data;
  }

  /**
   * Get quiz details.
   * Response will include quiz base data and questions list.
   *
   * If quiz is not active, has been deleted or was not created yet,
   * {QuizDetailsNotFound} object will be returned.
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getQuiz(
    id: number,
  ): Promise<QuizDetailsInterface | QuizDetailsNotFound> {
    const response = await axiosInstance.get(`quiz/?id=${id}`);
    return response.data;
  }
}

export default Api;
