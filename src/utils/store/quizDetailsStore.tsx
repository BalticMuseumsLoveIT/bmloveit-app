import {
  QuizDetailsInterface,
  QuizInterface,
  isQuizDetailsNotFound,
  QuizAnswerResponse,
  QuizQuestionInterface,
} from 'utils/interfaces';
import { action, computed, observable } from 'mobx';
import { AxiosError } from 'axios';

export enum QuizDetailsState {
  NOT_LOADED,
  LOADING,
  LOADED,
  SUBMITTED,
  NOT_FOUND,
  ERROR,
}

export class QuizDetailsStore {
  @observable quizList: Array<QuizInterface> = [];

  @observable quizState: QuizDetailsState = QuizDetailsState.NOT_LOADED;
  @observable quizDetails: QuizDetailsInterface | null = null;
  @observable quizAnswer: QuizAnswerResponse | null = null;

  @action loadingQuizDetails() {
    this.unsetQuizDetails(QuizDetailsState.LOADING);
  }

  @action loadQuizDetails(quizDetails: QuizDetailsInterface) {
    this.quizState = QuizDetailsState.LOADED;
    this.quizDetails = quizDetails;
  }

  @action submitQuizAnswer(answer: QuizAnswerResponse) {
    this.quizState = QuizDetailsState.SUBMITTED;
    this.quizAnswer = answer;
  }

  @action unsetQuizDetails(
    status: QuizDetailsState = QuizDetailsState.NOT_LOADED,
  ) {
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
      this.unsetQuizDetails(QuizDetailsState.NOT_FOUND);
    } else {
      this.unsetQuizDetails(QuizDetailsState.ERROR);
      // TODO: Handle unexpected error
    }
  }

  @computed get questionData(): QuizQuestionInterface | null {
    switch (this.quizState) {
      case QuizDetailsState.LOADED:
        return this.quizDetails!.questions_data[0];
      case QuizDetailsState.SUBMITTED:
        return this.quizAnswer!.question_data;
      default:
        return null;
    }
  }

  @computed get isLoaded(): boolean {
    return this.quizState === QuizDetailsState.LOADED;
  }

  @computed get isSubmitted(): boolean {
    return this.quizState === QuizDetailsState.SUBMITTED;
  }
}

const quizDetailsStore = new QuizDetailsStore();

export default quizDetailsStore;
