import { SurveyInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, observable } from 'mobx';

export enum SurveyListState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}
export class SurveyListStore {
  @observable state: SurveyListState = SurveyListState.NOT_LOADED;
  @observable list: Array<SurveyInterface> = [];

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

const surveyListStore = new SurveyListStore();

export default surveyListStore;
