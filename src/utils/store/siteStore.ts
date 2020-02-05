import { SiteInterface, SiteTheme } from 'utils/interfaces';
import Api from 'utils/api';
import { getTranslatedString, isColorValid } from 'utils/helpers';
import { action, computed, observable } from 'mobx';

export class SiteStore {
  @observable siteData: SiteInterface | null = null;

  isDataAvailable(): this is { siteData: SiteInterface } {
    return this.siteData !== null;
  }

  @action setSiteData = (
    siteData: SiteInterface | Array<SiteInterface> | null,
  ) => {
    if (Array.isArray(siteData)) {
      siteData = siteData.length > 0 ? siteData[0] : null;
    }

    this.siteData = siteData;
  };

  @action loadSiteData = async () => {
    const response = await Api.getSiteData();
    this.setSiteData(response);
  };

  @computed get title(): string {
    if (!this.isDataAvailable()) return '';

    return getTranslatedString(
      this.siteData.title,
      this.siteData.title_translation,
    );
  }

  @computed get description(): string {
    if (!this.isDataAvailable()) return '';

    return getTranslatedString(
      this.siteData.description,
      this.siteData.description_translation,
    );
  }

  @computed get about(): string {
    if (!this.isDataAvailable()) return '';

    return getTranslatedString(
      this.siteData.about,
      this.siteData.about_translation,
    );
  }

  @computed get image(): string {
    if (!this.isDataAvailable()) return '';

    return this.siteData.image;
  }

  @computed get logo(): string {
    if (!this.isDataAvailable()) return '';

    return this.siteData.logo;
  }

  @computed get termsURL(): string {
    if (!this.isDataAvailable()) return '';

    return this.siteData.terms_url;
  }

  @computed get theme(): SiteTheme {
    if (!this.isDataAvailable() || this.siteData.theme === null)
      return SiteTheme.LIGHT;

    return this.siteData.theme;
  }

  @computed get backgroundColor(): string | null {
    if (!this.isDataAvailable()) return null;

    const color = this.siteData.background_color || '';
    return isColorValid(color) ? color : null;
  }

  @computed get primaryColor(): string | null {
    if (!this.isDataAvailable()) return null;

    const color = this.siteData.primary_color || '';
    return isColorValid(color) ? color : null;
  }
}

const siteStore = new SiteStore();

export default siteStore;
