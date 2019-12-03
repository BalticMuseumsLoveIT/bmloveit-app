import { observable } from 'mobx';
import { SurveyInterface } from '../interfaces';

export class SurveyListStore {
  @observable surveyList: SurveyInterface[] = [];
}

const surveyListStore = new SurveyListStore();

export default surveyListStore;
