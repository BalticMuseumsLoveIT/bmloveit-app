import translations from 'utils/translation/translations';
import { observable } from 'mobx';
import detectBrowserLanguage from 'detect-browser-language';

export class UiStore {
  @observable private lang: string;
  @observable private isMenuOpened: boolean;

  constructor(defaultLang: string) {
    this.lang = defaultLang;
    this.isMenuOpened = false;
  }

  public setLang(lang: string): void {
    this.lang = lang;
  }

  public getLang(): string {
    return this.lang;
  }

  public getProperText(key: string): string {
    return translations[this.getLang()][key];
  }

  public toggleIsMenuOpened(): void {
    this.isMenuOpened = !this.getIsMenuOpened();
  }

  public getIsMenuOpened(): boolean {
    return this.isMenuOpened;
  }
}

const browserLang = detectBrowserLanguage();
console.log('UiStore | browserLang: ', browserLang);
const defaultLang = browserLang in translations ? browserLang : 'en';

const uiStore = new UiStore(defaultLang);

export default uiStore;
