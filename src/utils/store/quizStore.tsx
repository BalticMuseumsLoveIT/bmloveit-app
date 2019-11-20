import { observable } from 'mobx';
import { QuizDetailsInterface, QuizInterface } from '../@types/interfaces';

class QuizStore {
  @observable quizList: QuizInterface[] = [];
  @observable quizDetails: QuizDetailsInterface | null = null;
}

const store = new QuizStore();

export default store;
