import Api from 'utils/api';
import { AuthTokenInterface } from 'utils/interfaces';
import UserAvatarStore from 'utils/store/userAvatarStore';
import { history } from 'App';
import localStorage from 'mobx-localstorage';
import { action, computed } from 'mobx';
import axios, { AxiosRequestConfig } from 'axios';

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

  @computed get refreshToken(): string {
    return this.authToken ? this.authToken.refresh_token : '';
  }

  @computed get expirationDate(): number {
    return this.authToken ? Date.parse(this.authToken.expires_date) : NaN;
  }

  @computed get createdDate(): number {
    return this.authToken ? Date.parse(this.authToken.created_date) : NaN;
  }

  @computed get refreshDate(): number {
    return this.expirationDate - this.timeOffset;
  }

  @computed get timeOffset(): number {
    return (this.expirationDate - this.createdDate) / 2;
  }

  @computed get shouldRefresh(): boolean {
    return this.refreshDate < Date.now();
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
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        if (config.url !== 'auth/token' && this.shouldRefresh) {
          try {
            const token = await Api.refreshToken(this.refreshToken);
            this.setAuthToken(token);
          } catch (error) {
            this.signOut();
            history.push('/login');
          }
        }

        if (this.isLoggedIn) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        return config;
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
