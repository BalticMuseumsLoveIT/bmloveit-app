import { getItemFromStorage, setItemToStorage } from 'utils/helpers';
import Api from 'utils/api';
import { observable, action } from 'mobx';

export class UserStore {
  @observable token = getItemFromStorage('token');

  @action
  setToken = (token: string): void => {
    this.token = setItemToStorage('token', token);
  };

  signIn = async (provider: string, accessToken: string): Promise<void> => {
    const data = await Api.signIn(provider, accessToken);
    this.setToken(data.access_token);
  };
}

const userStore = new UserStore();

export default userStore;
