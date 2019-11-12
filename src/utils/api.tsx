import tempUserData from 'utils/tempUserData.json';

abstract class Api {
  static async getAvailableRoutes(): Promise<any> {
    try {
      return await this.requestData('GET', 'route');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAvailableRoute(id: number): Promise<any> {
    try {
      return await this.requestData('GET', `route/${id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private static async requestData(
    method: string,
    url: string,
    body: Array<any> = [],
    headers: Record<string, any> = {
      Authorization: `Bearer ${tempUserData.token}`,
    },
  ): Promise<any> {
    const endpoint = `${process.env.REACT_APP_API_URL}/${url}`;

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: headers,
        body: body.length > 0 ? JSON.stringify(body) : undefined,
      });

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Api;
