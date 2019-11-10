import userStore from 'utils/store/userStore';

abstract class Api {
  public static async getRoutes(): Promise<any> {
    try {
      return await this.requestData('GET', 'route');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getRoute(id: number): Promise<any> {
    try {
      return await this.requestData('GET', `route/${id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getLocationsForRoute(id: number): Promise<any> {
    try {
      return await this.requestData(
        'GET',
        `locations/?location_routes__route__id=${id}`,
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getLocation(id: number): Promise<any> {
    try {
      const response = await this.requestData('GET', `locations/?id=${id}`);

      // api returns array with one element
      return response[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private static async requestData(
    method: string,
    url: string,
    body: Record<string, any> = {},
    headers: Record<string, any> = {},
  ): Promise<any> {
    const endpoint = `${process.env.REACT_APP_API_URL}/${url}`;

    const userToken = userStore.getToken();
    if (userToken.length > 0) {
      headers['Authorization'] = `Bearer ${userToken}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: headers,
        body:
          Object.entries(body).length > 0 ? JSON.stringify(body) : undefined,
      });

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Api;
