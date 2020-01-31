import { SiteInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { ContentState } from 'components/Content/Content';
import uiStore from 'utils/store/uiStore';
import { action, autorun, computed, observable, when } from 'mobx';

export enum LanguagePageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class LanguagePageStore {
  private readonly _manageContentState: boolean;

  @observable state: LanguagePageState = LanguagePageState.NOT_LOADED;
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

  constructor(manageContentState = false) {
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

  @action setSiteData = (siteData: Array<SiteInterface>) => {
    this.siteData = siteData;
  };

  @action loadData = async () => {
    try {
      this.setState(LanguagePageState.LOADING);

      const [siteData] = await Promise.all([
        Api.getSiteData(),
        when(() => this.tReady === true),
      ]);

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
