import { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import { SurveyDetailsInterface } from 'utils/interfaces';
import { SurveyForm } from 'components/SurveyForm/SurveyForm';
import { FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t, ready } = useTranslation('survey-details-page');

  if (!ready) return null;

  switch (state) {
    case SurveyDetailsState.LOADED:
      return survey ? <SurveyForm survey={survey} onSubmit={onSubmit} /> : null;
    case SurveyDetailsState.SUBMITTED:
      return (
        <div>
          <p>
            {t('submitted.summary', 'You have finished a survey - thank you')}
          </p>
          <p>
            <Link to="/survey">
              {t('submitted.backLink', 'Go to the list of active surveys')}
            </Link>
          </p>
        </div>
      );
    case SurveyDetailsState.NOT_FOUND:
      return (
        <p>{t('error.notFound', 'Survey with a given ID was not found')}</p>
      );
    case SurveyDetailsState.ERROR:
      return (
        <p>
          {t('error.generic', 'Sorry but survey cannot be displayed right now')}
        </p>
      );
    case SurveyDetailsState.LOADING:
    default:
      return null;
  }
};
