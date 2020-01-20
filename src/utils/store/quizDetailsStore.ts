import {
  isQuizDetailsNotFound,
  ItemInterface,
  QuizAnswerResponse,
  QuizDetailsInterface,
  QuizQuestionInterface,
} from 'utils/interfaces';
import Api from 'utils/api';
import { ContentState } from 'components/Content/Content';
import { getTranslatedString } from 'utils/helpers';
import { action, autorun, computed, observable } from 'mobx';
import uiStore from './uiStore';

export enum QuizDetailsState {
  NOT_LOADED,
  LOADING,
  LOADED,
  SUBMITTED,
  NOT_FOUND,
  ERROR,
}

export default class QuizDetailsStore {
  @observable state: QuizDetailsState = QuizDetailsState.NOT_LOADED;

  @observable quiz: QuizDetailsInterface | null = null;

  @observable answer: QuizAnswerResponse | null = null;

  @observable itemData: ItemInterface | null = null;

  @observable isSubmitting = false;

  private readonly _manageContentState: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case QuizDetailsState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case QuizDetailsState.NOT_LOADED:
      case QuizDetailsState.LOADED:
      case QuizDetailsState.SUBMITTED:
      case QuizDetailsState.NOT_FOUND:
      case QuizDetailsState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  unmount = () => {
    if (this._manageContentState) {
      this.setState(QuizDetailsState.NOT_LOADED);
    }
  };

  constructor(manageContentState = false) {
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @computed get title(): string {
    return (
      (this.quiz &&
        getTranslatedString(
          this.quiz.name_full,
          this.quiz.name_full_translation,
        )) ||
      ''
    );
  }

  @computed get description(): string {
    return (
      (this.quiz &&
        getTranslatedString(
          this.quiz.description,
          this.quiz.description_translation,
        )) ||
      ''
    );
  }

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

  @computed get nextItemId(): number {
    return this.itemData !== null && this.itemData.next_item !== null
      ? this.itemData.next_item
      : NaN;
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

  @action setItemData(itemData: Array<ItemInterface>) {
    this.itemData = itemData.length ? itemData[0] : null;
  }

  @action setIsSubmitting(isSubmitting: boolean) {
    this.isSubmitting = isSubmitting;
  }

  @action
  async loadQuiz(id: number) {
    this.setState(QuizDetailsState.LOADING);
    try {
      this.setQuiz(await Api.getQuiz(id));

      if (this.quiz && this.quiz.item !== null) {
        const item = await Api.getItem(this.quiz.item);
        if (item.length) this.setItemData(item);
      }

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
      this.setIsSubmitting(true);
      const fulfillment = await Api.getQuizFulfillment(this.quiz.id);
      const answer = await Api.getQuizAnswer(fulfillment.id, question, option);
      this.setAnswer(answer);
      this.setState(QuizDetailsState.SUBMITTED);
    } catch (e) {
      this.setState(QuizDetailsState.ERROR);
    } finally {
      this.setIsSubmitting(false);
    }
  }
}
