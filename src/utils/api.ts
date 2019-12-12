import userStore from 'utils/store/userStore';
import {
  QuizAnswerResponse,
  QuizDetailsInterface,
  QuizFulfillmentResponse,
  QuizInterface,
  RouteInterface,
  SignInResponseInterface,
} from 'utils/interfaces';

abstract class Api {
  public static signIn = async (
    provider: string,
    accessToken: string,
  ): Promise<SignInResponseInterface> => {
    const body = {
      grant_type: 'convert_token',
      client_id: process.env.REACT_APP_CLIENT_ID,
      backend: provider,
      token: accessToken,
    };

    const response = await userStore.axiosInstance.post(
      'auth/convert-token',
      JSON.stringify(body),
    );

    return response.data;
  };

  public static getRoutes = async (): Promise<Array<RouteInterface>> => {
    const response = await userStore.axiosInstance.get('api/route/');

    return response.data;
  };

  public static getRoute = async (id: number): Promise<RouteInterface> => {
    const response = await userStore.axiosInstance.get(`api/route/${id}`);

    return response.data;
  };

  public static async getPrivateMedia(path: string): Promise<string> {
    const response = await userStore.axiosInstance.get(path, {
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
    const response = await userStore.axiosInstance.get('api/quiz');
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
    const response = await userStore.axiosInstance.get(`api/quiz/${id}`);
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

    const response = await userStore.axiosInstance.post(
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

    const response = await userStore.axiosInstance.post(
      'api/quiz-answer/',
      formData,
    );
    return response.data;
  }
}

export default Api;
