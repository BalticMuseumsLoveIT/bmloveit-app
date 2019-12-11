import userStore from 'utils/store/userStore';
import {
  QuizAnswerResponse,
  QuizDetailsInterface,
  QuizFulfillmentResponse,
  QuizInterface,
  SurveyInterface,
  SurveyDetailsInterface,
  SurveyFulfillmentResponse,
} from 'utils/interfaces';
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

  public static async getPrivateMedia(path: string): Promise<string> {
    const response = await axiosInstance.get(path, {
      responseType: 'arraybuffer',
    });

    const data = Buffer.from(response.data, 'binary').toString('base64');

    return `data:${response.headers['content-type']};base64,${data}`;
  }

  /**
   * Get list of all active quizzes.
   * Response will not include questions.
   *
   * @throws Axios error
   */
  public static async getQuizList(): Promise<Array<QuizInterface>> {
    const response = await axiosInstance.get('api/quiz');
    return response.data;
  }

  /**
   * Get quiz details.
   * Response will include quiz base data and questions list.
   *
   * If quiz is not active, has been deleted or was not created yet,
   * Axios Error will be thrown with status 404 and
   * response.data equal to {QuizDetailsNotFound}
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getQuiz(id: number): Promise<QuizDetailsInterface> {
    const response = await axiosInstance.get(`api/quiz/${id}`);
    return response.data;
  }

  /**
   * Get a fulfillment for a quiz with a given id
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getQuizFulfillment(
    id: number,
  ): Promise<QuizFulfillmentResponse> {
    const formData = new FormData();
    formData.append('quiz', id.toString());

    const response = await axiosInstance.post(
      'api/quiz-fulfillment/',
      formData,
    );
    return response.data;
  }

  /**
   * Check quiz answer
   *
   * @param {number} fulfillment - Fulfillment ID
   * @param {number} question - Question ID
   * @param {number} option - Option ID
   * @throws Axios error
   */
  public static async getQuizAnswer(
    fulfillment: number,
    question: number,
    option: number,
  ): Promise<QuizAnswerResponse> {
    const formData = new FormData();
    formData.append('fulfillment', fulfillment.toString());
    formData.append('question', question.toString());
    formData.append('options_data', option.toString());

    const response = await axiosInstance.post('api/quiz-answer/', formData);
    return response.data;
  }

  /**
   * Get list of all active surveys.
   *
   * @throws Axios error
   */
  public static async getSurveyList(): Promise<SurveyInterface[]> {
    const response = await axiosInstance.get('api/survey');
    return response.data;
  }

  /**
   * Get survey details
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getSurveyDetails(
    id: number,
  ): Promise<SurveyDetailsInterface> {
    const response = await axiosInstance.get(`api/survey/${id}`);
    return response.data;
  }

  /**
   * Get a fulfillment for a survey with a given id
   *
   * @param {number} id - Survey ID
   * @throws Axios error
   */
  public static async getSurveyFulfillment(
    id: number,
  ): Promise<SurveyFulfillmentResponse> {
    const formData = new FormData();
    formData.append('survey', id.toString());

    const response = await axiosInstance.post(
      'api/survey-fulfillment/',
      formData,
    );

    return response.data;
  }

  /**
   * Check survey answer
   *
   * @param {number} fulfillment - Fulfillment ID
   * @param {number} question - Question ID
   * @param {string} value - Open answer
   * @param {Array<number>} options_data - Select and Multiselect
   * @throws Axios error
   */
  public static async getSurveyAnswer(
    fulfillment: number,
    question: number,
    value: string,
    options_data: Array<number>,
  ): Promise<void> {
    const formData = {
      fulfillment: fulfillment,
      question: question,
      value: value,
      options_data: options_data,
    };

    const response = await axiosInstance.post('api/survey-answer/', formData);

    return response.data;
  }
}

export default Api;
