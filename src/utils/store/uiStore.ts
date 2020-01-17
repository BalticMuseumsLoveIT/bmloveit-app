import { ContentState } from 'components/Content/Content';
import { CommonLanguageInterface } from 'utils/interfaces';
import { action, observable } from 'mobx';

export class UiStore {
  @observable isMenuOpened: boolean;
  @observable contentState: ContentState;

  /**
   * List of all supported languages provided by a backend server
   *
   * Should be initialized as soon as possible, for example in
   * componentDidMount method of <App /> component
   */
  @observable languages: Array<CommonLanguageInterface> = [];

  /**
   * Current UI language provided by i18next auto detection or user choice
   *
   * Should be hooked into i18next `languageChanged` event
   */
  @observable language: string | null = null;

  constructor() {
    this.isMenuOpened = false;
    this.contentState = ContentState.AVAILABLE;
  }

  @action setLanguages = (languages: Array<CommonLanguageInterface>) => {
    this.languages = languages;
  };

  @action setLanguage = (language: string) => {
    this.language = language;
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

const uiStore = new UiStore();

export default uiStore;
