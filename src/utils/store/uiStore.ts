import translations from 'utils/translation/translations';
import { observable, action } from 'mobx';
import detectBrowserLanguage from 'detect-browser-language';

export class UiStore {
  @observable lang: string;
  @observable isMenuOpened: boolean;

  constructor(defaultLang: string) {
    this.lang = defaultLang;
    this.isMenuOpened = false;
  }

  @action
  setLang = (lang: string): void => {
    this.lang = lang;
  };

  @action
  toggleIsMenuOpened = (): void => {
    this.isMenuOpened = !this.isMenuOpened;
  };

  getProperText = (key: string): string => {
    return translations[this.lang][key];
  };
}

const browserLang = detectBrowserLanguage();

const defaultLang = browserLang in translations ? browserLang : 'en';

const uiStore = new UiStore(defaultLang);

export default uiStore;
