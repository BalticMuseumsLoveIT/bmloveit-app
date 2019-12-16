import { SurveyInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { ContentState } from 'components/Content/Content';
import { action, autorun, observable } from 'mobx';
import uiStore from './uiStore';

export enum SurveyListState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class SurveyListStore {
  @observable state: SurveyListState = SurveyListState.NOT_LOADED;
  @observable list: Array<SurveyInterface> = [];

  private readonly _manageContentState: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case SurveyListState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case SurveyListState.NOT_LOADED:
      case SurveyListState.LOADED:
      case SurveyListState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  unmount = () => {
    if (this._manageContentState) {
      this.setState(SurveyListState.NOT_LOADED);
    }
  };

  constructor(manageContentState = false) {
    this._manageContentState = manageContentState;

    if (this._manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @action setState(state: SurveyListState) {
    this.state = state;
  }

  @action setList(list: Array<SurveyInterface>) {
    this.list = list;
  }

  @action async loadList() {
    this.setState(SurveyListState.LOADING);
    try {
      this.setList(await Api.getSurveyList());
      this.setState(SurveyListState.LOADED);
    } catch (e) {
      this.setState(SurveyListState.ERROR);
      // TODO: Handle error
    }
  }
}
