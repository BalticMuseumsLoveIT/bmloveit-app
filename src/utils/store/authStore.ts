import Api from 'utils/api';
import { AuthTokenInterface } from 'utils/interfaces';
import { history } from 'App';
import trackerStore from 'utils/store/trackerStore';
import localStorage from 'mobx-localstorage';
import { action, computed } from 'mobx';
import axios, { AxiosRequestConfig } from 'axios';

enum FetchingRefreshedTokenState {
  PENDING,
  RESOLVED,
}

export class AuthStore {
  private readonly AUTH_TOKEN_KEY = 'authToken';

  private fetchingRefreshedTokenState: FetchingRefreshedTokenState =
    FetchingRefreshedTokenState.RESOLVED;

  private pendingRequests: Array<{
    resolve: { (accessToken: string): void };
  }> = [];

  @computed get authToken(): AuthTokenInterface | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  @computed get isLoggedIn(): boolean {
    if (this.authToken === null || this.authToken.access_token.length === 0) {
      return false;
    }

    return !(
      Number.isNaN(this.expirationDate) || Date.now() > this.expirationDate
    );
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
    const timeOffset = (this.expirationDate - this.createdDate) / 2;

    return this.expirationDate - timeOffset;
  }

  @computed get axiosInstance() {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: Number.parseInt(process.env.REACT_APP_API_TIMEOUT || '') || 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        if (this.isLoggedIn) {
          if (this.refreshDate < Date.now() && config.url !== 'auth/token') {
            try {
              if (
                this.fetchingRefreshedTokenState ===
                FetchingRefreshedTokenState.PENDING
              ) {
                // Add current request to array of pending requests
                // It will be resolved immediately after fetching the refreshed token
                const accessToken = await new Promise(async resolve => {
                  this.pendingRequests.push({ resolve });
                });

                config.headers['Authorization'] = `Bearer ${accessToken}`;
                return config;
              }

              // Section for the first request of the group of requests
              // that need to refresh token before resolving
              this.setFetchingRefreshedTokenState(
                FetchingRefreshedTokenState.PENDING,
              );

              const refreshTokenData = await Api.refreshToken(
                this.refreshToken,
              );

              return new Promise(resolve => {
                this.setAuthToken(refreshTokenData);

                resolve(config);
                this.resolvePendingRequests(this.accessToken);

                this.setFetchingRefreshedTokenState(
                  FetchingRefreshedTokenState.RESOLVED,
                );
              });
            } catch (error) {
              this.signOut();
              history.push('/login');
            }
          }

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
  setFetchingRefreshedTokenState = (
    state: FetchingRefreshedTokenState,
  ): void => {
    this.fetchingRefreshedTokenState = state;
  };

  @action
  signIn = async (provider: string, accessToken: string): Promise<void> => {
    const authToken = await Api.signIn(provider, accessToken);
    this.setAuthToken(authToken);
    await trackerStore.initializeCurrentRoute();
  };

  @action
  signInAsGuest = async () => {
    const guest = await Api.createGuestProfile();
    const authToken = await Api.signInAsGuest(guest.username);
    this.setAuthToken(authToken);
  };

  @action
  signOut = (): boolean => {
    trackerStore.resetCurrentRoute();
    return localStorage.delete(this.AUTH_TOKEN_KEY);
  };

  @action
  resolvePendingRequests = (accessToken: string) => {
    this.pendingRequests.forEach(request => {
      request.resolve(accessToken);
    });

    this.pendingRequests = [];
  };
}

const authStore = new AuthStore();

export default authStore;
