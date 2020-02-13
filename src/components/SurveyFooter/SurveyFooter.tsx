import { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import { AppButton } from 'components/Buttons/AppButton.style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface SurveyFooterProps {
  state: SurveyDetailsState;
  nextItemId: number;
  isSubmitting: boolean;
}

export const SurveyFooter = function({
  state,
  nextItemId,
  isSubmitting,
}: SurveyFooterProps) {
  const { t, ready } = useTranslation('survey-details-page');

  if (!ready) return null;

  switch (state) {
    case SurveyDetailsState.LOADED:
    case SurveyDetailsState.SUBMITTING:
      return (
        <AppButton type="submit" form="surveyForm" disabled={isSubmitting}>
          {t('form.button.submit.label', 'Submit')}
        </AppButton>
      );
    case SurveyDetailsState.SUBMITTED:
      return (
        <AppButton as={Link} to={`/item/${nextItemId}`}>
          {t('button.next.label', 'Next')}
        </AppButton>
      );
    default:
      return null;
  }
};
