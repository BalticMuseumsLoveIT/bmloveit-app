import { SiteInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';
import localStorage from 'mobx-localstorage';
import { SyntheticEvent } from 'react';

export class CookieBarStore {
  private readonly COOKIES_KEY = 'cookies-accepted';
  private readonly COOKIES_VALUE = 1;

  @observable isSiteDataLoaded = false;
  @observable siteData: Array<SiteInterface> = [];

  @computed get isAccepted() {
    return localStorage.getItem(this.COOKIES_KEY);
  }

  @computed get termsURL(): string {
    if (Array.isArray(this.siteData) && this.siteData.length) {
      return this.siteData[0].terms_url;
    }

    return '';
  }

  @action loadData = async () => {
    try {
      const siteData = await Api.getSiteData();
      this.setSiteData(siteData);
    } catch (e) {}
  };

  @action setSiteData = (siteData: Array<SiteInterface>) => {
    this.siteData = siteData;
    this.isSiteDataLoaded = true;
  };

  @action clickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem(this.COOKIES_KEY, this.COOKIES_VALUE);
  };
}

const cookieBarStore = new CookieBarStore();

export default cookieBarStore;
