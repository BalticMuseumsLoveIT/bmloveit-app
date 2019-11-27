import { getItemFromStorage, setItemToStorage } from 'utils/helpers';
import { observable } from 'mobx';

export class UserStore {
  @observable private token = getItemFromStorage('token');

  public setToken(token: string): void {
    this.token = setItemToStorage('token', token);
  }

  public getToken(): string {
    return this.token;
  }
}

const userStore = new UserStore();

export default userStore;
