import { SurveyInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';

export enum SurveyListState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}
export class SurveyListStore {
  @observable private _state: SurveyListState = SurveyListState.NOT_LOADED;

  @computed get state() {
    return this._state;
  }

  @observable private _list: Array<SurveyInterface> = [];

  @computed get list() {
    return this._list;
  }

  @action async loadList() {
    this._state = SurveyListState.LOADING;
    try {
      this._list = await Api.getSurveyList();
      this._state = SurveyListState.LOADED;
    } catch (e) {
      this._state = SurveyListState.ERROR;
      // TODO: Handle error
    }
  }
}

const surveyListStore = new SurveyListStore();

export default surveyListStore;
