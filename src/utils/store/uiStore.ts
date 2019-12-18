import translations from 'utils/translation/translations';
import { ContentState } from 'components/Content/Content';
import { action, observable } from 'mobx';
import detectBrowserLanguage from 'detect-browser-language';

export class UiStore {
  @observable lang: string;
  @observable isMenuOpened: boolean;
  @observable contentState: ContentState;

  constructor(defaultLang: string) {
    this.lang = defaultLang;
    this.isMenuOpened = false;
    this.contentState = ContentState.AVAILABLE;
  }

  @action
  setLang = (lang: string): void => {
    this.lang = lang;
  };

  @action
  setContentState(contentState: ContentState) {
    this.contentState = contentState;
  }

  @action
  toggleIsMenuOpened = (): void => {
    this.isMenuOpened = !this.isMenuOpened;
  };
}

const browserLang = detectBrowserLanguage();

const defaultLang = browserLang in translations ? browserLang : 'en';

const uiStore = new UiStore(defaultLang);

export default uiStore;
