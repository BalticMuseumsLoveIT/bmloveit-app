import { QuizInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, autorun, observable } from 'mobx';
import uiStore from './uiStore';
import { ContentState } from '../../components/Content/Content';

export enum QuizListState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class QuizListStore {
  @observable state: QuizListState = QuizListState.NOT_LOADED;
  @observable list: Array<QuizInterface> = [];

  private readonly _manageContentState: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case QuizListState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case QuizListState.NOT_LOADED:
      case QuizListState.LOADED:
      case QuizListState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  unmount = () => {
    if (this._manageContentState) {
      this.setState(QuizListState.NOT_LOADED);
    }
  };

  constructor(manageContentState = false) {
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

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
