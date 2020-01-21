import { ContentState } from 'components/Content/Content';
import { CommonLanguageInterface } from 'utils/interfaces';
import { action, computed, observable } from 'mobx';

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

  @computed get languageId(): number {
    let languageData;

    if (this.language && this.languages.length) {
      languageData = this.languages.find(
        language => language.key === this.language,
      );
    }

    return languageData ? languageData.id : NaN;
  }

  @action setLanguages = (languages: Array<CommonLanguageInterface>) => {
    this.languages = languages;
  };

  @action setLanguage = (language: string) => {
    this.language = language.substring(0, 2).toLowerCase() || null;
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
