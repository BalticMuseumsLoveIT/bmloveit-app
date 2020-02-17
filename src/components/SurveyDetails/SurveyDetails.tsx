import { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import { SurveyDetailsInterface } from 'utils/interfaces';
import { SurveyForm } from 'components/SurveyForm/SurveyForm';
import { Description, Emphasize } from 'components/Page/Page.style';
import { AbstractDuck } from 'components/SurveyDetails/SurveyDetails.style';
import { Error404, Error404Context } from 'components/Error404/Error404';
import { FormikValues } from 'formik';
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
        <>
          <Emphasize>
            {t('submitted.summary', 'You have finished a survey - thank you')}
          </Emphasize>
          <AbstractDuck src="/images/abstract-duck.svg" />
        </>
      );
    case SurveyDetailsState.NOT_FOUND:
      return <Error404 context={Error404Context.SURVEY} />;
    case SurveyDetailsState.ERROR:
      return (
        <Description>
          {t('error.generic', 'Sorry but survey cannot be displayed right now')}
        </Description>
      );
    case SurveyDetailsState.LOADING:
    default:
      return null;
  }
};
