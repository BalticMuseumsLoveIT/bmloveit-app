abstract class Api {
  static baseUrl: string = process.env.REACT_APP_API_URL || '';

  static async getAvailableRoutes(token: string): Promise<any> {
    const url = `${this.baseUrl}/route`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAvailableRoute(id: number, token: string): Promise<any> {
    const url = `${this.baseUrl}/route/${id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Api;
