import tempUserData from 'utils/tempUserData.json';
import { observable } from 'mobx';

export class UserStore {
  @observable private token = '';

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }
}

const userStore = new UserStore();

userStore.setToken(tempUserData.token);

export default userStore;
