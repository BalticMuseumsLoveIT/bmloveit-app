import Api from 'utils/api';
import { AuthTokenInterface } from 'utils/interfaces';
import UserAvatarStore from 'utils/store/userAvatarStore';
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
    if (this.authToken === null) {
      return false;
    }

    const expirationDate = new Date(this.authToken.expires_date).getTime();
    const currentDate = new Date().getTime();

    return !!(
      this.authToken.access_token.length && currentDate < expirationDate
    );
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

    axiosInstance.interceptors.request.use(
      config => {
        if (this.isLoggedIn) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          originalRequest._isRetry !== true
        ) {
          originalRequest._isRetry = true; // custom field for avoiding request loop

          const refreshTokenData = await Api.refreshToken(
            this.authToken!.refresh_token,
          );

          this.setAuthToken(refreshTokenData);

          return axiosInstance(originalRequest);
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
