import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import { action, autorun, observable, when } from 'mobx';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class AboutPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
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

      await Promise.all([when(() => this.tReady === true)]);

      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
