import { CommonLanguageInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { ContentState } from 'components/Content/Content';
import uiStore from 'utils/store/uiStore';
import { action, autorun, observable, when } from 'mobx';
import ISO6391 from 'iso-639-1';
import { FormikValues } from 'formik';
import { i18n } from 'i18next';

export enum LanguageListState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class LanguageListStore {
  private _i18n: i18n;
  private readonly _manageContentState: boolean;

  @observable state: LanguageListState = LanguageListState.NOT_LOADED;
  @observable languageList: Array<CommonLanguageInterface> = [];
  @observable tReady?: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case LanguageListState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case LanguageListState.NOT_LOADED:
      case LanguageListState.LOADED:
      case LanguageListState.ERROR:
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

  @action setState = (state: LanguageListState) => {
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

  @action handleSubmit = async (values: FormikValues): Promise<void> => {
    await this._i18n.changeLanguage(values.language);
  };

  @action loadLanguageList = async () => {
    try {
      this.setState(LanguageListState.LOADING);

      const [languageList] = await Promise.all([
        Api.getLanguageList(),
        // Keep `PROCESSING` state till translations are fetched
        when(() => this.tReady === true),
      ]);

      this.setLanguageList(languageList);
      this.setState(LanguageListState.LOADED);
    } catch (e) {
      this.setState(LanguageListState.ERROR);
    }
  };

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(LanguageListState.NOT_LOADED);
    }
  };
}
