import { isAPIError, SurveyDetailsInterface } from 'utils/interfaces';
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
    if (this._surveyId === null) {
      this._state = SurveyDetailsState.ERROR;
      return;
    }

    try {
      const fulfillment = await Api.getSurveyFulfillment(this._surveyId);
      // TODO: Send values
      this._state = SurveyDetailsState.SUBMITTED;
    } catch (error) {
      this._state = SurveyDetailsState.ERROR;
      // TODO: Handle unexpected error
    }
  }
}

const surveyDetailsStore = new SurveyDetailsStore();

export default surveyDetailsStore;
