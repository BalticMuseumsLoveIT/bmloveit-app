import { getItemFromStorage, setItemToStorage } from 'utils/helpers';
import Api from 'utils/api';
import { observable, action, computed } from 'mobx';
import axios from 'axios';
import Cookies from 'universal-cookie';

export class UserStore {
  @observable token = getItemFromStorage('token');
  private _cookies = new Cookies();

  @computed get isLoggedIn(): boolean {
    return this.token !== '';
  }

  @computed get axiosInstance() {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    if (this.isLoggedIn) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: headers,
    });
  }

  @action
  setToken = (token: string): void => {
    this.token = setItemToStorage('token', token);
    // const domain = new URL(process.env.REACT_APP_API_URL || '').hostname;
    this._cookies.set('access_token', token, {
      path: '/',
      // domain: domain,
    });
  };

  @action
  signIn = async (provider: string, accessToken: string): Promise<void> => {
    const data = await Api.signIn(provider, accessToken);
    this.setToken(data.access_token);
  };

  @action
  signOut = (): void => {
    this.setToken('');
    this._cookies.remove('access_token');
  };
}

const userStore = new UserStore();

export default userStore;
