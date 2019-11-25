import { observable } from 'mobx';
import { QuizDetailsInterface, QuizInterface } from '../interfaces';

export class QuizStore {
  @observable quizList: QuizInterface[] = [];
  @observable quizDetails: QuizDetailsInterface | null = null;
}

const quizStore = new QuizStore();

export default quizStore;
