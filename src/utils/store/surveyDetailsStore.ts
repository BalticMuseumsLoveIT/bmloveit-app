import {
  isAPIError,
  SurveyDetailsInterface,
  SurveyQuestionInterface,
  SurveyQuestionType,
} from 'utils/interfaces';
import Api from 'utils/api';
import { ContentState } from 'components/Content/Content';
import ItemStore from 'utils/store/itemStore';
import { getTranslatedString } from 'utils/helpers';
import { action, autorun, computed, observable, when } from 'mobx';
import { FormikValues } from 'formik';
import uiStore from './uiStore';

export enum SurveyDetailsState {
  NOT_LOADED,
  LOADING,
  LOADED,
  SUBMITTING,
  SUBMITTED,
  NOT_FOUND,
  ERROR,
}

export default class SurveyDetailsStore {
  @observable state: SurveyDetailsState = SurveyDetailsState.NOT_LOADED;

  @observable survey: SurveyDetailsInterface | null = null;

  @observable itemData = new ItemStore();

  @observable tReady?: boolean;

  private readonly _manageContentState: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case SurveyDetailsState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case SurveyDetailsState.NOT_LOADED:
      case SurveyDetailsState.LOADED:
      case SurveyDetailsState.SUBMITTED:
      case SurveyDetailsState.NOT_FOUND:
      case SurveyDetailsState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  unmount = () => {
    if (this._manageContentState) {
      this.setState(SurveyDetailsState.NOT_LOADED);
    }
  };

  constructor(manageContentState = false) {
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @computed get surveyId(): number | null {
    return this.survey ? this.survey.id : null;
  }

  @computed get isLoading(): boolean {
    return this.state === SurveyDetailsState.LOADING;
  }

  @computed get isSubmitting(): boolean {
    return this.state === SurveyDetailsState.SUBMITTING;
  }

  @computed get isSubmitted(): boolean {
    return this.state === SurveyDetailsState.SUBMITTED;
  }

  @computed get nextItemId(): number {
    return this.itemData.nextItemId;
  }

  @computed get title(): string {
    return this.survey
      ? getTranslatedString(
          this.survey.name_full,
          this.survey.name_full_translation,
        )
      : '';
  }

  @computed get description(): string {
    return this.survey
      ? getTranslatedString(
          this.survey.description,
          this.survey.description_translation,
        )
      : '';
  }

  @action setState(state: SurveyDetailsState) {
    this.state = state;
  }

  @action setSurvey(survey: SurveyDetailsInterface) {
    this.survey = survey;
  }

  @action setTReady = (tReady?: boolean) => {
    this.tReady = tReady;
  };

  @action loadData = async (id: number) => {
    try {
      this.setState(SurveyDetailsState.LOADING);

      const [surveyDetails] = await Promise.all([
        Api.getSurveyDetails(id),
        when(() => this.tReady === true),
      ]);

      if (surveyDetails.item) {
        await this.itemData.loadItemData(surveyDetails.item);
      }

      this.setSurvey(surveyDetails);
      this.setState(SurveyDetailsState.LOADED);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        isAPIError(error.response.data)
      ) {
        this.setState(SurveyDetailsState.NOT_FOUND);
      } else {
        this.setState(SurveyDetailsState.ERROR);
        // TODO: Handle unexpected error
      }
    }
  };

  @action handleSubmit = async (values: FormikValues) => {
    if (this.surveyId === null || this.survey === null) {
      this.setState(SurveyDetailsState.ERROR);
      return;
    }

    try {
      this.setState(SurveyDetailsState.SUBMITTING);
      const fulfillment = await Api.getSurveyFulfillment(this.surveyId);

      const answers = [];

      for (const [question, answer] of Object.entries(values)) {
        const questionId = parseInt(question.split('_').pop() || '');

        if (isNaN(questionId)) {
          continue;
        }

        const questionData:
          | SurveyQuestionInterface
          | undefined = this.survey.questions_data.find(
          question => question.id === questionId,
        );

        if (typeof questionData === 'undefined') {
          continue;
        }

        const answerRequestData = {
          fulfillment: fulfillment.id,
          question: questionId,
          value: '' as string,
          options_data: [] as Array<number>,
        };

        // TODO: Handle potential value errors
        switch (questionData.type) {
          case SurveyQuestionType.OPEN:
            answerRequestData.value = answer;
            break;
          case SurveyQuestionType.SELECT:
            const option = parseInt(answer.split('_').pop() || '');
            answerRequestData.options_data.push(option);
            break;
          case SurveyQuestionType.MULTISELECT:
            const options = answer.map((item: string) => {
              return parseInt(item.split('_').pop() || '');
            });
            answerRequestData.options_data = options;
            break;
        }

        answers.push(answerRequestData);
      }

      await Promise.all(
        answers.map(request => {
          return Api.getSurveyAnswer(
            request.fulfillment,
            request.question,
            request.value,
            request.options_data,
          );
        }),
      );

      this.setState(SurveyDetailsState.SUBMITTED);
    } catch (error) {
      this.setState(SurveyDetailsState.ERROR);
      // TODO: Handle unexpected error
    }
  };
}
