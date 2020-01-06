import { SurveyDetailsState } from 'utils/store/surveyDetailsStore';
import Footer from 'components/Footer/Footer';
import { FooterLink } from 'components/Footer/Footer.style';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
          <FooterLink
            as="button"
            type="submit"
            form="surveyForm"
            disabled={isSubmitting}
            isDisabled={isSubmitting}
          >
            {t('form.button.submit.label', 'Submit')}
          </FooterLink>
        </Footer>
      );
    case SurveyDetailsState.SUBMITTED:
      return (
        <Footer>
          <FooterLink to={`/item/${nextItemId}`}>Next</FooterLink>
        </Footer>
      );
    default:
      return null;
  }
};
