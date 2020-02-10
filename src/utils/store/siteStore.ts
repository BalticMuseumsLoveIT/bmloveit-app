import { SiteInterface, ThemeType } from 'utils/interfaces';
import { defaultTheme, darkPartial, lightPartial } from 'utils/theme';
import Api from 'utils/api';
import {
  getTranslatedString,
  isColorValid,
  RecursivePartial,
} from 'utils/helpers';
import { action, computed, observable } from 'mobx';
import merge from 'deepmerge';
import { DefaultTheme } from 'styled-components';

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
    if (!this.isDataAvailable() || this.siteData.image === null) return '';

    return this.siteData.image;
  }

  @computed get logo(): string {
    if (!this.isDataAvailable() || this.siteData.logo === null) return '';

    return this.siteData.logo;
  }

  @computed get termsURL(): string {
    if (!this.isDataAvailable()) return '';

    return this.siteData.terms_url;
  }

  @computed get themeType(): ThemeType | null {
    if (!this.isDataAvailable() || this.siteData.theme === null) return null;

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

  @computed get theme(): DefaultTheme {
    let typePartial: RecursivePartial<DefaultTheme> = {};

    switch (this.themeType) {
      case ThemeType.DARK:
        typePartial = darkPartial;
        typePartial.type = ThemeType.DARK;
        break;
      case ThemeType.LIGHT:
        typePartial = lightPartial;
        typePartial.type = ThemeType.LIGHT;
    }

    const colorPartial: RecursivePartial<DefaultTheme> = {
      colors: { background: {} },
    };

    if (this.backgroundColor)
      colorPartial.colors!.background!.app = this.backgroundColor;

    if (this.primaryColor)
      colorPartial.colors!.background!.alternative = this.primaryColor;

    const theme = merge.all([defaultTheme, typePartial, colorPartial]);

    return theme as DefaultTheme;
  }
}

const siteStore = new SiteStore();

export default siteStore;
