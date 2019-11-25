import { action, observable } from 'mobx';
import { AxiosError } from 'axios';
import {
  QuizDetailsInterface,
  QuizInterface,
  isQuizDetailsNotFound,
} from '../interfaces';

export enum QuizState {
  NOT_LOADED,
  LOADING,
  LOADED,
  NOT_FOUND,
  ERROR,
}

export class QuizStore {
  @observable quizList: QuizInterface[] = [];

  @observable quizState: QuizState = QuizState.NOT_LOADED;
  @observable quizDetails: QuizDetailsInterface | null = null;

  @action loadingQuizDetails = () => {
    this.unsetQuizDetails(QuizState.LOADING);
  };

  @action loadQuizDetails = (quizDetails: QuizDetailsInterface) => {
    this.quizState = QuizState.LOADED;
    this.quizDetails = quizDetails;
  };

  @action unsetQuizDetails = (status: QuizState = QuizState.NOT_LOADED) => {
    this.quizState = status;
    this.quizDetails = null;
  };

  @action handleQuizDetailsError = (error: AxiosError) => {
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
  };
}

const quizStore = new QuizStore();

export default quizStore;
