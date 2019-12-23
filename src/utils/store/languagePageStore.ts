import { CommonLanguageInterface, SiteInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { ContentState } from 'components/Content/Content';
import uiStore from 'utils/store/uiStore';
import { action, autorun, computed, observable, when } from 'mobx';
import ISO6391 from 'iso-639-1';
import { FormikValues } from 'formik';
import { i18n } from 'i18next';

export enum LanguagePageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class LanguagePageStore {
  private _i18n: i18n;
  private readonly _manageContentState: boolean;

  @observable state: LanguagePageState = LanguagePageState.NOT_LOADED;
  @observable languageList: Array<CommonLanguageInterface> = [];
  @observable siteData: Array<SiteInterface> = [];
  @observable tReady?: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case LanguagePageState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case LanguagePageState.NOT_LOADED:
      case LanguagePageState.LOADED:
      case LanguagePageState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  constructor(i18n: i18n, manageContentState = false) {
    this._i18n = i18n;
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @computed get logotypeURL(): string {
    if (Array.isArray(this.siteData) && this.siteData.length) {
      return this.siteData[0].logo;
    }

    return '';
  }

  @action setState = (state: LanguagePageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action setLanguageList = (languageList: Array<CommonLanguageInterface>) => {
    this.languageList = languageList.filter(language =>
      ISO6391.validate(language.key),
    );
  };

  @action setSiteData = (siteData: Array<SiteInterface>) => {
    this.siteData = siteData;
  };

  @action handleSubmit = async (values: FormikValues): Promise<void> => {
    await this._i18n.changeLanguage(values.language);
  };

  @action loadData = async () => {
    try {
      this.setState(LanguagePageState.LOADING);

      const [languageList, siteData] = await Promise.all([
        Api.getLanguageList(),
        Api.getSiteData(),
        // Keep `PROCESSING` state till translations are fetched
        when(() => this.tReady === true),
      ]);

      this.setLanguageList(languageList);
      this.setSiteData(siteData);
      this.setState(LanguagePageState.LOADED);
    } catch (e) {
      this.setState(LanguagePageState.ERROR);
    }
  };

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(LanguagePageState.NOT_LOADED);
    }
  };
}
