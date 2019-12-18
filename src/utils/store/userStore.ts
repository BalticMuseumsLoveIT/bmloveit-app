import { getItemFromStorage, setItemToStorage } from 'utils/helpers';
import Api from 'utils/api';
import { observable, action, computed } from 'mobx';
import axios from 'axios';

export class UserStore {
  @observable token = getItemFromStorage('token');

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
  };

  @action
  signIn = async (provider: string, accessToken: string): Promise<void> => {
    const data = await Api.signIn(provider, accessToken);
    this.setToken(data.access_token);
  };

  @action
  signOut = (): void => {
    this.setToken('');
  };
}

const userStore = new UserStore();

export default userStore;
