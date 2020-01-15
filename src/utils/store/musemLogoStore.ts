import { SiteInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, observable } from 'mobx';

export default class MuseumLogoStore {
  @observable siteData: SiteInterface | null = null;

  @action async load() {
    const siteData = await Api.getSiteData();
    this.setSiteData(siteData);
  }

  @action setSiteData(siteData: Array<SiteInterface>) {
    this.siteData = siteData.length ? siteData[0] : null;
  }
}
