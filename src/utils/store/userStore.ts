import { getItemFromStorage, setItemToStorage } from 'utils/helpers';
import Api from 'utils/api';
import { observable, action, computed } from 'mobx';

export class UserStore {
  @observable token = getItemFromStorage('token');

  @computed get loggedIn(): boolean {
    return this.token !== '';
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
}

const userStore = new UserStore();

export default userStore;
