import translations from 'utils/translation/translations';
import { observable, computed } from 'mobx';

export class TranslationStore {
  @observable private lang = 'en';

  public setLang(lang: string): void {
    this.lang = lang;
  }

  public getLang(): string {
    return this.lang;
  }

  getProperText(key: string): string {
    return translations[this.getLang()][key];
  }
}

const translationStore = new TranslationStore();

export default translationStore;
