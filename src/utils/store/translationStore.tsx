import translations from 'utils/translation/translations';
import { observable } from 'mobx';
import detectBrowserLanguage from 'detect-browser-language';

export class TranslationStore {
  @observable private lang: string;

  constructor(defaultLang: string) {
    this.lang = defaultLang;
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
}

const browserLang = detectBrowserLanguage();
const defaultLang = browserLang in translations ? browserLang : 'en';

const translationStore = new TranslationStore(defaultLang);

export default translationStore;
