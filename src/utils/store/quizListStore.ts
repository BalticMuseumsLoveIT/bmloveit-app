import { QuizInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';

export enum QuizListState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export class QuizListStore {
  @observable private _state: QuizListState = QuizListState.NOT_LOADED;

  @observable private _list: Array<QuizInterface> = [];

  @computed get state() {
    return this._state;
  }

  @computed get list() {
    return this._list;
  }

  @action async loadList() {
    this._state = QuizListState.LOADING;
    try {
      this._list = await Api.getQuizList();
      this._state = QuizListState.LOADED;
    } catch (e) {
      this._state = QuizListState.ERROR;
    }
  }
}

const quizListStore = new QuizListStore();

export default quizListStore;
