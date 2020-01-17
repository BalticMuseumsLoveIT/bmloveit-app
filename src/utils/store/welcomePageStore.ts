import { SiteInterface } from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { action, autorun, computed, observable, when } from 'mobx';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class WelcomePageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable siteData: Array<SiteInterface> = [];
  @observable tReady?: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case PageState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case PageState.NOT_LOADED:
      case PageState.LOADED:
      case PageState.ERROR:
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

  @action loadData = async () => {
    try {
      this.setState(PageState.LOADING);

      const [siteData] = await Promise.all([
        Api.getSiteData(),
        when(() => this.tReady === true),
      ]);

      this.setSiteData(siteData);
      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @computed get siteTitle(): string {
    return this.siteData.length ? this.siteData[0].title : '';
  }

  @computed get siteDescription(): string {
    return this.siteData.length ? this.siteData[0].description : '';
  }

  @computed get siteLogo(): string {
    return this.siteData.length ? this.siteData[0].logo : '';
  }

  @computed get siteImage(): string {
    return this.siteData.length ? this.siteData[0].image : '';
  }

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action setSiteData = (siteData: Array<SiteInterface>) => {
    this.siteData = siteData;
  };

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
