import {
  isQuizDetailsNotFound,
  ItemInterface,
  QuizAnswerResponse,
  QuizDetailsInterface,
  QuizFulfillmentResponse,
  QuizQuestionInterface,
} from 'utils/interfaces';
import Api from 'utils/api';
import { ContentState } from 'components/Content/Content';
import { getTranslatedString } from 'utils/helpers';
import ItemStore from 'utils/store/itemStore';
import { action, autorun, computed, observable, when } from 'mobx';
import uiStore from './uiStore';

export enum QuizDetailsState {
  NOT_LOADED,
  LOADING,
  LOADED,
  SUBMITTED,
  ANSWERED,
  NOT_FOUND,
  ERROR,
}

export default class QuizDetailsStore {
  @observable state: QuizDetailsState = QuizDetailsState.NOT_LOADED;

  @observable fulfillments: Array<QuizFulfillmentResponse> = [];

  @observable fulfillment: QuizFulfillmentResponse | null = null;

  @observable quiz: QuizDetailsInterface | null = null;

  @observable answer: QuizAnswerResponse | null = null;

  @observable itemData = new ItemStore();

  @observable isSubmitting = false;

  @observable tReady?: boolean;

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
    return this.quiz
      ? getTranslatedString(
          this.quiz.name_full,
          this.quiz.name_full_translation,
        )
      : '';
  }

  @computed get description(): string {
    return this.quiz
      ? getTranslatedString(
          this.quiz.description,
          this.quiz.description_translation,
        )
      : '';
  }

  @computed get question(): QuizQuestionInterface | null {
    switch (this.state) {
      case QuizDetailsState.LOADED:
        return this.quiz!.questions_data[0];
      case QuizDetailsState.SUBMITTED:
        return this.answer!.question_data;
      case QuizDetailsState.ANSWERED:
        return this.fulfillment!.answers_data[0].question_data;
      default:
        return null;
    }
  }

  @computed get isLoaded(): boolean {
    return this.state === QuizDetailsState.LOADED;
  }

  @computed get isLoading(): boolean {
    return this.state === QuizDetailsState.LOADING;
  }

  @computed get isSubmitted(): boolean {
    return this.state === QuizDetailsState.SUBMITTED;
  }

  @computed get isAnswered(): boolean {
    return this.state === QuizDetailsState.ANSWERED;
  }

  @computed get nextItemId(): number {
    return this.itemData.nextItemId;
  }

  @computed get parentItemId(): number {
    return this.itemData.itemId;
  }

  @action setState = (state: QuizDetailsState) => {
    this.state = state;
  };

  @action setQuiz = (quiz: QuizDetailsInterface) => {
    this.quiz = quiz;
  };

  @action setFulfillments = (fulfillments: Array<QuizFulfillmentResponse>) => {
    this.fulfillments = fulfillments;
  };

  @action setFulfillment = (fulfillment: QuizFulfillmentResponse | null) => {
    this.fulfillment = fulfillment;
  };

  @action setAnswer = (answer: QuizAnswerResponse) => {
    this.answer = answer;
  };

  @action setItemData = (itemData: Array<ItemInterface>) => {
    this.itemData.setItemData(itemData.length ? itemData[0] : null);
  };

  @action setIsSubmitting = (isSubmitting: boolean) => {
    this.isSubmitting = isSubmitting;
  };

  @action setTReady = (tReady?: boolean) => {
    this.tReady = tReady;
  };

  @action loadData = async (id: number) => {
    try {
      this.setState(QuizDetailsState.LOADING);

      await Promise.all([
        this.setQuiz(await Api.getQuiz(id)),
        this.setFulfillments(await Api.getQuizFulfillmentList()),
        when(() => this.tReady === true),
      ]);

      if (this.quiz) {
        const prevFulfillment =
          this.fulfillments.length > 0
            ? this.fulfillments.find(fulfillment => {
                return fulfillment.quiz === this.quiz!.id;
              })
            : undefined;

        if (prevFulfillment) {
          this.setFulfillment(prevFulfillment);
        } else {
          this.setFulfillment(await Api.getQuizFulfillment(this.quiz.id));
        }
      }

      if (this.fulfillment && this.fulfillment.all_answers_sent) {
        this.setAnswer(this.fulfillment.answers_data[0]);
      }

      if (this.quiz && this.quiz.item !== null) {
        const item = await Api.getItem(this.quiz.item);
        this.setItemData(item);
      }

      this.setState(
        this.fulfillment && this.fulfillment.all_answers_sent
          ? QuizDetailsState.ANSWERED
          : QuizDetailsState.LOADED,
      );
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
  };

  @action handleSubmit = async (question: number, option: number) => {
    if (this.quiz === null || this.fulfillment === null) {
      this.setState(QuizDetailsState.ERROR);
      return;
    }

    try {
      this.setIsSubmitting(true);
      const answer = await Api.getQuizAnswer(
        this.fulfillment.id,
        question,
        option,
      );
      this.setAnswer(answer);
      this.setState(QuizDetailsState.SUBMITTED);
    } catch (e) {
      this.setState(QuizDetailsState.ERROR);
    } finally {
      this.setIsSubmitting(false);
    }
  };
}
