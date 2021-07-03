import { ContentState } from 'components/Content/Content';
import { CommonLanguageInterface, ItemInterface } from 'utils/interfaces';
import MainMenuStore from 'utils/store/mainMenuStore';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';

export enum AppState {
  LOADING,
  READY,
  ERROR,
}

export class UiStore {
  @observable showTextsData: boolean;
  @observable textsData: string[] | null;

  @observable loadingPopupData: boolean;
  @observable popupItemFromEvent: ItemInterface | null;

  @observable appState: AppState;

  @observable contentState: ContentState;

  @observable nav: MainMenuStore = new MainMenuStore();

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
    this.showTextsData = false;
    this.textsData = null;
    this.popupItemFromEvent = null;
    this.loadingPopupData = false;
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

    return this.languages.some(({ key: language }) => {
      const uiLanguage = language.toLowerCase().slice(0, 2);
      return uiLanguage === userLanguage;
    });
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
    this.contentState = contentState;
  };

  @action setAppState = (appState: AppState) => {
    this.appState = appState;
  };

  @action setShowTextsData = (show: boolean) => {
    this.showTextsData = show;
  };

  @action setTextsData = (textsData: string[]) => {
    this.textsData = textsData;
  };

  @action setPopupItemFromEvent = (popupItem: ItemInterface) => {
    this.popupItemFromEvent = popupItem;
  };

  @action setLoadingPopupData = (isLoading: boolean) => {
    this.loadingPopupData = isLoading;
  };
}

const uiStore = new UiStore();

export default uiStore;
