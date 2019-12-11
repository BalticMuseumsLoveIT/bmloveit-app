import {
  isQuizDetailsNotFound,
  QuizAnswerResponse,
  QuizDetailsInterface,
  QuizQuestionInterface,
} from 'utils/interfaces';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';

export enum QuizDetailsState {
  NOT_LOADED,
  LOADING,
  LOADED,
  SUBMITTED,
  NOT_FOUND,
  ERROR,
}

export class QuizDetailsStore {
  @observable private _state: QuizDetailsState = QuizDetailsState.NOT_LOADED;

  @observable private _quiz: QuizDetailsInterface | null = null;

  @observable private _answer: QuizAnswerResponse | null = null;

  @computed get state() {
    return this._state;
  }

  @computed get quiz() {
    return this._quiz;
  }

  @computed get answer() {
    return this._answer;
  }

  @computed get question(): QuizQuestionInterface | null {
    switch (this._state) {
      case QuizDetailsState.LOADED:
        return this._quiz!.questions_data[0];
      case QuizDetailsState.SUBMITTED:
        return this._answer!.question_data;
      default:
        return null;
    }
  }

  @computed get isLoaded(): boolean {
    return this._state === QuizDetailsState.LOADED;
  }

  @computed get isSubmitted(): boolean {
    return this._state === QuizDetailsState.SUBMITTED;
  }

  @action
  async loadQuiz(id: number) {
    this._state = QuizDetailsState.LOADING;
    try {
      this._quiz = await Api.getQuiz(id);
      this._state = QuizDetailsState.LOADED;
    } catch (e) {
      if (
        e.response &&
        e.response.status === 404 &&
        isQuizDetailsNotFound(e.response.data)
      ) {
        this._state = QuizDetailsState.NOT_FOUND;
      } else {
        this._state = QuizDetailsState.ERROR;
      }
    }
  }

  @action.bound
  async handleSubmit(question: number, option: number) {
    if (this._quiz === null) {
      this._state = QuizDetailsState.ERROR;
      return;
    }

    try {
      const fulfillment = await Api.getQuizFulfillment(this._quiz.id);
      this._answer = await Api.getQuizAnswer(fulfillment.id, question, option);
      this._state = QuizDetailsState.SUBMITTED;
    } catch (e) {
      this._state = QuizDetailsState.ERROR;
    }
  }
}

const quizDetailsStore = new QuizDetailsStore();

export default quizDetailsStore;
