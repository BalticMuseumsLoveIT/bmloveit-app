import { action, computed } from 'mobx';
import localStorage from 'mobx-localstorage';
import { SyntheticEvent } from 'react';

export class CookieBarStore {
  private readonly COOKIES_KEY = 'cookies-accepted';
  private readonly COOKIES_VALUE = 'true';

  @computed get isAccepted() {
    return localStorage.getItem(this.COOKIES_KEY);
  }

  @action clickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem(this.COOKIES_KEY, this.COOKIES_VALUE);
  };
}

const cookieBarStore = new CookieBarStore();

export default cookieBarStore;
