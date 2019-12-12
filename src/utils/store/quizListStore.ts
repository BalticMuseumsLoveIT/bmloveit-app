import { QuizInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, observable } from 'mobx';

export enum QuizListState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class QuizListStore {
  @observable state: QuizListState = QuizListState.NOT_LOADED;

  @observable list: Array<QuizInterface> = [];

  @action setState = (state: QuizListState) => {
    this.state = state;
  };

  @action setList = (list: Array<QuizInterface>) => {
    this.list = list;
  };

  @action loadList = async () => {
    this.setState(QuizListState.LOADING);
    try {
      const list = await Api.getQuizList();
      this.setList(list);
      this.setState(QuizListState.LOADED);
    } catch (e) {
      this.setState(QuizListState.ERROR);
    }
  };
}
