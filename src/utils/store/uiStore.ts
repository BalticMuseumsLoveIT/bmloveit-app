import { ContentState } from 'components/Content/Content';
import { CommonLanguageInterface } from 'utils/interfaces';
import MainMenuStore from 'utils/store/mainMenuStore';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';

export enum AppState {
  LOADING,
  READY,
  ERROR,
}

export class UiStore {
  @observable appState: AppState;
  @observable contentState: ContentState;
  @observable nav: MainMenuStore = new MainMenuStore();
  @observable timeWhenProcessingStarted = NaN;

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
    this.contentState = ContentState.AVAILABLE;
    this.appState = AppState.LOADING;
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

  @computed get isAppLoading(): boolean {
    return this.appState === AppState.LOADING;
  }

  @computed get isAppReady(): boolean {
    return this.appState === AppState.READY;
  }

  @computed get isUserLocaleMatch(): boolean {
    if (this.languages.length === 0 || this.language === null) {
      return false;
    }

    // toISO6391(this.language) causes problems:
    // "TypeError: Cannot read property 'appState' of undefined"
    const userLanguage = this.language.toLowerCase().slice(0, 2);

    const isUserLocaleMatch = this.languages.some(({ key: language }) => {
      const uiLanguage = language.toLowerCase().slice(0, 2);
      return uiLanguage === userLanguage;
    });

    return isUserLocaleMatch;
  }

  @computed get shouldDisplayLoader(): boolean {
    if (isNaN(this.timeWhenProcessingStarted)) {
      return false;
    }

    const processingTimeSoFar = Date.now() - this.timeWhenProcessingStarted;

    return processingTimeSoFar > 200;
  }

  @action setLanguages = (languages: Array<CommonLanguageInterface>) => {
    this.languages = languages;
  };

  @action loadLanguages = async () => {
    const languages = await Api.getLanguageList();
    this.setLanguages(languages);
  };

  @action setLanguage = (language: string) => {
    this.language = language.substring(0, 2).toLowerCase() || null;
  };

  @action setContentState = (contentState: ContentState) => {
    this.timeWhenProcessingStarted =
      contentState === ContentState.PROCESSING ? Date.now() : 0;
    this.contentState = contentState;
  };

  @action setAppState = (appState: AppState) => {
    this.appState = appState;
  };
}

const uiStore = new UiStore();

export default uiStore;
