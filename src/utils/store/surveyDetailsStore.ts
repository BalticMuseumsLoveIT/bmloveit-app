import {
  isAPIError,
  SurveyDetailsInterface,
  SurveyQuestionType,
} from 'utils/interfaces';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';
import { FormikValues } from 'formik';

export enum SurveyDetailsState {
  NOT_LOADED,
  LOADING,
  LOADED,
  SUBMITTED,
  NOT_FOUND,
  ERROR,
}

export class SurveyDetailsStore {
  @observable private _state: SurveyDetailsState =
    SurveyDetailsState.NOT_LOADED;

  @computed get state(): SurveyDetailsState {
    return this._state;
  }

  @observable private _survey: SurveyDetailsInterface | null = null;

  @computed get survey() {
    return this._survey;
  }

  @observable private _surveyId: number | null = null;

  @action async loadSurvey(id: number) {
    this._state = SurveyDetailsState.LOADING;
    try {
      this._survey = await Api.getSurveyDetails(id);
      this._surveyId = id;
      this._state = SurveyDetailsState.LOADED;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        isAPIError(error.response.data)
      ) {
        this._state = SurveyDetailsState.NOT_FOUND;
      } else {
        this._state = SurveyDetailsState.ERROR;
        // TODO: Handle unexpected error
      }
    }
  }

  @action.bound async handleSubmit(values: FormikValues) {
    if (this._surveyId === null || this._survey === null) {
      this._state = SurveyDetailsState.ERROR;
      return;
    }

    try {
      const fulfillment = await Api.getSurveyFulfillment(this._surveyId);

      const answers = [];

      for (const [question, answer] of Object.entries(values)) {
        const questionId = parseInt(question.split('_').pop() || '');

        if (isNaN(questionId)) {
          continue;
        }

        const questionData = this._survey.questions_data.find(
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

      this._state = SurveyDetailsState.SUBMITTED;
    } catch (error) {
      this._state = SurveyDetailsState.ERROR;
      // TODO: Handle unexpected error
    }
  }
}

const surveyDetailsStore = new SurveyDetailsStore();

export default surveyDetailsStore;
