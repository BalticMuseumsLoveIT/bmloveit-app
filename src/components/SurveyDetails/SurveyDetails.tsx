import { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import { SurveyDetailsInterface } from 'utils/interfaces';
import { SurveyForm } from 'components/SurveyForm/SurveyForm';
import { FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import React from 'react';

export interface SurveyProps {
  state: SurveyDetailsState;
  survey: SurveyDetailsInterface | null;
  onSubmit: (values: FormikValues) => Promise<void>;
}

export const SurveyDetails = function({
  state,
  survey,
  onSubmit,
}: SurveyProps) {
  switch (state) {
    case SurveyDetailsState.LOADED:
      return survey ? <SurveyForm survey={survey} onSubmit={onSubmit} /> : null;
    case SurveyDetailsState.SUBMITTED:
      return (
        <div>
          <p>You have finished a survey - thank you</p>
          <p>
            <Link to="/survey">Go to the list of active surveys</Link>
          </p>
        </div>
      );
    case SurveyDetailsState.NOT_FOUND:
      return <p>Ankieta o podanym identyfikatorze nie została odnaleziona</p>;
    case SurveyDetailsState.ERROR:
      return <p>Wystąpił błąd podczas pobierania ankiety</p>;
    case SurveyDetailsState.LOADING:
    default:
      return null;
  }
};
