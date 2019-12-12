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
  @observable state: QuizDetailsState = QuizDetailsState.NOT_LOADED;

  @observable quiz: QuizDetailsInterface | null = null;

  @observable answer: QuizAnswerResponse | null = null;

  @computed get question(): QuizQuestionInterface | null {
    switch (this.state) {
      case QuizDetailsState.LOADED:
        return this.quiz!.questions_data[0];
      case QuizDetailsState.SUBMITTED:
        return this.answer!.question_data;
      default:
        return null;
    }
  }

  @computed get isLoaded(): boolean {
    return this.state === QuizDetailsState.LOADED;
  }

  @computed get isSubmitted(): boolean {
    return this.state === QuizDetailsState.SUBMITTED;
  }

  @action setState(state: QuizDetailsState) {
    this.state = state;
  }

  @action setQuiz(quiz: QuizDetailsInterface) {
    this.quiz = quiz;
  }

  @action setAnswer(answer: QuizAnswerResponse) {
    this.answer = answer;
  }

  @action
  async loadQuiz(id: number) {
    this.setState(QuizDetailsState.LOADING);
    try {
      this.setQuiz(await Api.getQuiz(id));
      this.setState(QuizDetailsState.LOADED);
    } catch (e) {
      if (
        e.response &&
        e.response.status === 404 &&
        isQuizDetailsNotFound(e.response.data)
      ) {
        this.setState(QuizDetailsState.NOT_FOUND);
      } else {
        this.setState(QuizDetailsState.ERROR);
      }
    }
  }

  @action.bound
  async handleSubmit(question: number, option: number) {
    if (this.quiz === null) {
      this.setState(QuizDetailsState.ERROR);
      return;
    }

    try {
      const fulfillment = await Api.getQuizFulfillment(this.quiz.id);
      this.setAnswer(await Api.getQuizAnswer(fulfillment.id, question, option));
      this.setState(QuizDetailsState.SUBMITTED);
    } catch (e) {
      this.setState(QuizDetailsState.ERROR);
    }
  }
}

const quizDetailsStore = new QuizDetailsStore();

export default quizDetailsStore;
