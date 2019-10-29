class Api {
  static baseUrl: string = process.env.REACT_APP_API_URL || '';

  static async getAvailableRoutes(): Promise<any> {
    const url = `${this.baseUrl}/route`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Api;
