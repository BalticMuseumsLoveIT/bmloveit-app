import {
  isAPIError,
  SurveyDetailsInterface,
  SurveyQuestionType,
} from 'utils/interfaces';
import Api from 'utils/api';
import { action, observable } from 'mobx';
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
  @observable state: SurveyDetailsState = SurveyDetailsState.NOT_LOADED;

  @observable survey: SurveyDetailsInterface | null = null;

  @observable surveyId: number | null = null;

  @action setState(state: SurveyDetailsState) {
    this.state = state;
  }

  @action setSurvey(survey: SurveyDetailsInterface) {
    this.survey = survey;
  }

  @action setSurveyId(surveyId: number) {
    this.surveyId = surveyId;
  }

  @action loadSurvey = async (id: number) => {
    this.setState(SurveyDetailsState.LOADING);
    try {
      this.setSurvey(await Api.getSurveyDetails(id));
      this.setSurveyId(id);
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
      const fulfillment = await Api.getSurveyFulfillment(this.surveyId);

      const answers = [];

      for (const [question, answer] of Object.entries(values)) {
        const questionId = parseInt(question.split('_').pop() || '');

        if (isNaN(questionId)) {
          continue;
        }

        const questionData = this.survey.questions_data.find(
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

const surveyDetailsStore = new SurveyDetailsStore();

export default surveyDetailsStore;