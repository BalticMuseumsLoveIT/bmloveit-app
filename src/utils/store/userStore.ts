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
  private isRefreshingToken = false;
  private pendingRequests: Array<{ (accessToken: string): void }> = [];

  @computed get authToken(): AuthTokenInterface | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  @computed get isLoggedIn(): boolean {
    return !!(this.authToken && this.authToken.access_token.length);
  }

  @computed get accessToken(): string {
    return this.authToken ? this.authToken.access_token : '';
  }

  @computed get expirationDate(): number {
    return this.authToken ? Date.parse(this.authToken.expires_date) : NaN;
  }

  @computed get createdDate(): number {
    return this.authToken ? Date.parse(this.authToken.created_date) : NaN;
  }

  @computed get timeOffset(): number {
    return (this.expirationDate - this.createdDate) / 2;
  }

  @computed get axiosInstance() {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // @TODO: Fix "config" type error
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore: Unreachable code error
    axiosInstance.interceptors.request.use(async config => {
      if (this.isLoggedIn) {
        if (
          config.url !== 'auth/token' &&
          this.expirationDate - this.timeOffset < Date.now()
        ) {
          try {
            if (this.isRefreshingToken) {
              const accessToken = await new Promise(async resolve => {
                this.pendingRequests.push(resolve);
              });

              config.headers['Authorization'] = `Bearer ${accessToken}`;
              return config;
            }

            this.isRefreshingToken = true;

            const refreshTokenData = await Api.refreshToken(
              this.authToken!.refresh_token,
            );

            return new Promise(resolve => {
              this.setAuthToken(refreshTokenData);

              this.resolvePendingRequests(this.accessToken);
              resolve(config);

              this.isRefreshingToken = false;
            });
          } catch (error) {
            this.signOut();
            history.push('/login');
          }
        }

        config.headers['Authorization'] = `Bearer ${this.accessToken}`;
      }

      return config;
    });

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

  @action
  resolvePendingRequests = (accessToken: string) => {
    this.pendingRequests.forEach(resolve => {
      resolve(accessToken);
    });

    this.pendingRequests = [];
  };
}

const userStore = new UserStore();

export default userStore;
