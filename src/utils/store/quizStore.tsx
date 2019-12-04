import { action, computed, observable } from 'mobx';
import { AxiosError } from 'axios';
import {
  QuizDetailsInterface,
  QuizInterface,
  isQuizDetailsNotFound,
  QuizAnswerResponse,
  QuizQuestionInterface,
} from 'utils/interfaces';

export enum QuizState {
  NOT_LOADED,
  LOADING,
  LOADED,
  SUBMITTED,
  NOT_FOUND,
  ERROR,
}

export class QuizStore {
  @observable quizList: QuizInterface[] = [];

  @observable quizState: QuizState = QuizState.NOT_LOADED;
  @observable quizDetails: QuizDetailsInterface | null = null;
  @observable quizAnswer: QuizAnswerResponse | null = null;

  @action loadingQuizDetails() {
    this.unsetQuizDetails(QuizState.LOADING);
  }

  @action loadQuizDetails(quizDetails: QuizDetailsInterface) {
    this.quizState = QuizState.LOADED;
    this.quizDetails = quizDetails;
  }

  @action submitQuizAnswer(answer: QuizAnswerResponse) {
    this.quizState = QuizState.SUBMITTED;
    this.quizAnswer = answer;
  }

  @action unsetQuizDetails(status: QuizState = QuizState.NOT_LOADED) {
    this.quizState = status;
    this.quizDetails = null;
    this.quizAnswer = null;
  }

  @action handleQuizDetailsError(error: AxiosError) {
    if (
      error.response &&
      error.response.status === 404 &&
      isQuizDetailsNotFound(error.response.data)
    ) {
      this.unsetQuizDetails(QuizState.NOT_FOUND);
    } else {
      this.unsetQuizDetails(QuizState.ERROR);
      // TODO: Handle unexpected error
    }
  }

  @computed get questionData(): QuizQuestionInterface | null {
    switch (this.quizState) {
      case QuizState.LOADED:
        return this.quizDetails!.questions_data[0];
      case QuizState.SUBMITTED:
        return this.quizAnswer!.question_data;
      default:
        return null;
    }
  }

  @computed get isLoaded(): boolean {
    return this.quizState === QuizState.LOADED;
  }

  @computed get isSubmitted(): boolean {
    return this.quizState === QuizState.SUBMITTED;
  }
}

const quizStore = new QuizStore();

export default quizStore;
