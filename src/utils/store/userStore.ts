import Api from 'utils/api';
import { AuthTokenInterface } from 'utils/interfaces';
import localStorage from 'mobx-localstorage';
import { action, computed } from 'mobx';
import axios from 'axios';

export class UserStore {
  private readonly AUTH_TOKEN_KEY = 'authToken';

  @computed get authToken(): AuthTokenInterface | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  @computed get isLoggedIn(): boolean {
    return !!(this.authToken && this.authToken.access_token.length);
  }

  @computed get accessToken(): string {
    return this.authToken ? this.authToken.access_token : '';
  }

  @computed get axiosInstance() {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    if (this.isLoggedIn) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: headers,
    });
  }

  @action
  setAuthToken = (authToken: AuthTokenInterface): void => {
    localStorage.setItem(this.AUTH_TOKEN_KEY, authToken);
  };

  @action
  signIn = async (provider: string, accessToken: string): Promise<void> => {
    const authToken = await Api.signIn(provider, accessToken);
    this.setAuthToken(authToken);
  };

  @action
  signOut = (): boolean => localStorage.delete(this.AUTH_TOKEN_KEY);
}

const userStore = new UserStore();

export default userStore;
