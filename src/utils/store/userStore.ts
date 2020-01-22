import Api from 'utils/api';
import { AuthTokenInterface } from 'utils/interfaces';
import UserAvatarStore from 'utils/store/userAvatarStore';
import { history } from 'App';
import localStorage from 'mobx-localstorage';
import { action, computed } from 'mobx';
import axios from 'axios';

export class UserStore {
  private readonly AUTH_TOKEN_KEY = 'authToken';

  readonly userAvatarStore = new UserAvatarStore();

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
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    axiosInstance.interceptors.request.use(async config => {
      if (this.isLoggedIn) {
        const expirationDate = Date.parse(this.authToken!.expires_date);
        const currentDate = Date.now();

        if (expirationDate < currentDate) {
          const token = this.authToken!.refresh_token;
          localStorage.removeItem(this.AUTH_TOKEN_KEY);

          const refreshTokenData = await Api.refreshToken(token);

          this.setAuthToken(refreshTokenData);
        }

        config.headers['Authorization'] = `Bearer ${this.accessToken}`;
      }

      return config;
    });

    axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (error.response.status === 401) {
          localStorage.removeItem(this.AUTH_TOKEN_KEY);
          history.push('/login');
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;
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
