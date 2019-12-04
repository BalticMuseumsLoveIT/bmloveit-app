import { computed, observable } from 'mobx';

export enum SurveyDetailsState {
  NOT_LOADED,
}

export class SurveyDetailsStore {
  @observable private _state: SurveyDetailsState =
    SurveyDetailsState.NOT_LOADED;

  @computed get state() {
    return this._state;
  }
}

const surveyDetailsStore = new SurveyDetailsStore();

export default surveyDetailsStore;
