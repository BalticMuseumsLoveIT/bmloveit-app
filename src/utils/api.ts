import authStore from 'utils/store/authStore';
import {
  QuizAnswerResponse,
  QuizDetailsInterface,
  QuizFulfillmentResponse,
  QuizInterface,
  SurveyInterface,
  SurveyDetailsInterface,
  SurveyFulfillmentResponse,
  RouteInterface,
  AuthTokenInterface,
  SiteInterface,
  AreaInterface,
  ItemInterface,
  LocationInterface,
  UserProfileInterface,
  TeamInterface,
  UserProfileCreateInterface,
  RouteTypeInterface,
  EventParams,
  MainMenuInterface,
  EventResponse,
} from 'utils/interfaces';

abstract class Api {
  public static signIn = async (
    provider: string,
    accessToken: string,
  ): Promise<AuthTokenInterface> => {
    const body = {
      grant_type: 'convert_token',
      client_id: process.env.REACT_APP_CLIENT_ID,
      backend: provider,
      token: accessToken,
    };

    const response = await authStore.axiosInstance.post(
      'auth/convert-token',
      JSON.stringify(body),
    );

    return response.data;
  };

  public static signInAsGuest = async (
    username: string,
  ): Promise<AuthTokenInterface> => {
    const params = {
      username: username,
      password: process.env.REACT_APP_GUEST_PASSWORD || 'password',
      grant_type: 'password',
      client_id: process.env.REACT_APP_CLIENT_ID,
    };

    const jsonParams = JSON.stringify(params);

    const endpoint = 'auth/token';

    const response = await authStore.axiosInstance.post(endpoint, jsonParams);

    return response.data;
  };

  public static refreshToken = async (
    refreshToken: string,
  ): Promise<AuthTokenInterface> => {
    const body = JSON.stringify({
      grant_type: 'refresh_token',
      client_id: process.env.REACT_APP_CLIENT_ID,
      refresh_token: refreshToken,
    });

    const response = await authStore.axiosInstance.post('auth/token', body);

    return response.data;
  };

  public static getRoutes = async (): Promise<Array<RouteInterface>> => {
    const response = await authStore.axiosInstance.get('api/route/');

    return response.data;
  };

  public static getRoute = async (id: number): Promise<RouteInterface> => {
    const response = await authStore.axiosInstance.get(`api/route/${id}`);

    return response.data;
  };

  public static getRouteTypes = async (): Promise<
    Array<RouteTypeInterface>
  > => {
    const response = await authStore.axiosInstance.get(`api/route-type/`);

    return response.data;
  };

  /**
   * Get list of all active quizzes.
   * Response will not include questions.
   *
   * @throws Axios error
   */
  public static async getQuizList(): Promise<Array<QuizInterface>> {
    const response = await authStore.axiosInstance.get('api/quiz');
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
    const response = await authStore.axiosInstance.get(`api/quiz/${id}`);
    return response.data;
  }

  /**
   * Get a fulfillment for a quiz with a given id
   *
   * If user has answered this quiz server will respond with error
   *
   * @param {number} id - Quiz ID
   * @throws Axios error
   */
  public static async getQuizFulfillment(
    id: number,
  ): Promise<QuizFulfillmentResponse> {
    const formData = new FormData();
    formData.append('quiz', id.toString());

    const response = await authStore.axiosInstance.post(
      'api/quiz-fulfillment/',
      formData,
    );
    return response.data;
  }

  public static async getQuizFulfillmentList(): Promise<
    Array<QuizFulfillmentResponse>
  > {
    const endpoint = 'api/quiz-fulfillment/';

    const response = await authStore.axiosInstance.get(endpoint);

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

    const response = await authStore.axiosInstance.post(
      'api/quiz-answer/',
      formData,
    );
    return response.data;
  }

  /**
   * Get list of all active surveys.
   *
   * @throws Axios error
   */
  public static async getSurveyList(
    location__id?: number,
    item__id?: number,
  ): Promise<Array<SurveyInterface>> {
    const params = {
      location__id:
        typeof location__id !== 'undefined' && isNaN(location__id)
          ? ''
          : location__id,
      item__id:
        typeof item__id !== 'undefined' && isNaN(item__id) ? '' : item__id,
    };
    const response = await authStore.axiosInstance.get('api/survey', {
      params,
    });
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
    const response = await authStore.axiosInstance.get(`api/survey/${id}`);
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

    const response = await authStore.axiosInstance.post(
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

    const response = await authStore.axiosInstance.post(
      'api/survey-answer/',
      formData,
    );

    return response.data;
  }

  /**
   * Get list of available languages
   */
  public static getLanguageList = async () => {
    const endpoint = 'api/language/';

    const response = await authStore.axiosInstance.get(endpoint);

    return response.data;
  };

  /**
   * Get list of sites
   * Only 1 site object should be present inside this "list"
   */
  public static getSiteData = async (): Promise<Array<SiteInterface>> => {
    const endpoint = 'api/site/';

    const response = await authStore.axiosInstance.get(endpoint);

    // Response should be an array with only one site object inside
    return response.data;
  };

  /**
   * Get list of areas
   */
  public static getAreaData = async (): Promise<Array<AreaInterface>> => {
    const endpoint = 'api/area/';

    const response = await authStore.axiosInstance.get(endpoint);

    // Response should be an array with only one site object inside
    return response.data;
  };

  public static getItemsList = async (): Promise<Array<ItemInterface>> => {
    const endpoint = 'api/item/';

    const response = await authStore.axiosInstance.get(endpoint);

    return response.data;
  };

  public static getItem = async (
    params:
      | number
      | {
          id?: number;
          name?: string;
          type__id?: number;
          type__name?: string;
          kind__id?: number;
          kind__name?: string;
          item_locations__location__id?: number;
          item_locations__location__name?: string;
          item_tags__tag__name?: string;
          parent_item__item__id?: number;
          item_routes__route__id?: number;
          item_routes__route__name?: string;
          item_locations__default?: boolean;
        },
  ): Promise<Array<ItemInterface>> => {
    const endpoint = 'api/item/';

    if (typeof params === 'number') params = { id: params };
    const response = await authStore.axiosInstance.get(endpoint, { params });

    return response.data;
  };

  public static getLocationsList = async (
    routeId = NaN,
    locationId = NaN,
  ): Promise<Array<LocationInterface>> => {
    const params = {
      location_routes__route__id: isNaN(routeId) ? '' : routeId,
      id: isNaN(locationId) ? '' : locationId,
    };

    const endpoint = 'api/locations/';

    const response = await authStore.axiosInstance.get(endpoint, { params });

    return response.data;
  };

  public static createGuestProfile = async (): Promise<
    UserProfileCreateInterface
  > => {
    const formData = {
      guest: true,
      password: process.env.REACT_APP_GUEST_PASSWORD || 'password',
      confirm_password: process.env.REACT_APP_GUEST_PASSWORD || 'password',
    };

    const endpoint = 'api/user_profile/';

    const response = await authStore.axiosInstance.post(endpoint, formData);

    return response.data;
  };

  public static getUserProfile = async (): Promise<
    Array<UserProfileInterface>
  > => {
    const endpoint = 'api/user_profile/';

    const response = await authStore.axiosInstance.get(endpoint);

    return response.data;
  };

  public static getEventsList = async (): Promise<Array<EventResponse>> => {
    const endpoint = 'api/events/';

    const response = await authStore.axiosInstance.get(endpoint);

    return response.data;
  };

  public static createEvent = async (eventParams: EventParams) => {
    const params = JSON.stringify(eventParams);

    const endpoint = 'api/events/';

    const response = await authStore.axiosInstance.post(endpoint, params);

    return response.data;
  };

  /**
   * Get list of teams in which user is a member
   * In normal conditions only 0 or 1 teams should be received
   */
  public static getTeamList = async (): Promise<Array<TeamInterface>> => {
    const endpoint = 'api/team/';

    const response = await authStore.axiosInstance.get(endpoint);

    return response.data;
  };

  public static getTeam = async (id: number): Promise<TeamInterface> => {
    const endpoint = `api/team/${id}`;

    const response = await authStore.axiosInstance.get(endpoint);

    return response.data;
  };

  public static teamCreate = async (teamName: string) => {
    const formData = {
      name: teamName,
    };

    return await authStore.axiosInstance.post('api/team-create/', formData);
  };

  public static teamJoin = async (teamName: string, teamAccessCode: string) => {
    const formData = {
      name: teamName,
      access_code: teamAccessCode,
    };

    return await authStore.axiosInstance.post('api/team-membership/', formData);
  };

  public static teamLeave = async (teamName: string) => {
    const formData = {
      name: teamName,
    };

    return await authStore.axiosInstance.delete(`api/team-membership/`, {
      data: formData,
    });
  };

  public static getAppMenu = async (): Promise<Array<MainMenuInterface>> => {
    const endpoint = `api/app_menu/`;

    const response = await authStore.axiosInstance.get(endpoint);

    return response.data;
  };
}

export default Api;
