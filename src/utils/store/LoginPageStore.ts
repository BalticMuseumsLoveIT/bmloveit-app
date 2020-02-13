import { action, observable } from 'mobx';

class LoginPageStore {
  @observable isOAuthFailed = false;

  @action setIsOAutoFailed(isOAuthFailed: boolean) {
    this.isOAuthFailed = isOAuthFailed;
  }
}

export default LoginPageStore;
