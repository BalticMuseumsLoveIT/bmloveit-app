import { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import Footer from 'components/Footer/Footer';
import { FooterButton } from 'components/Footer/Footer.style';
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
        <Footer>
          <FooterButton type="submit" form="surveyForm" disabled={isSubmitting}>
            {t('form.button.submit.label', 'Submit')}
          </FooterButton>
        </Footer>
      );
    case SurveyDetailsState.SUBMITTED:
      return (
        <Footer>
          <FooterButton as={Link} to={`/item/${nextItemId}`}>
            {t('button.next.label', 'Next')}
          </FooterButton>
        </Footer>
      );
    default:
      return null;
  }
};
