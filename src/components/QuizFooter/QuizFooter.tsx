import { QuizDetailsState } from 'utils/store/quizDetailsStore';
import Footer from 'components/Footer/Footer';
import { FooterLink } from 'components/Footer/Footer.style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface QuizFooterProps {
  state: QuizDetailsState;
  nextItemId: number;
  isSubmitting: boolean;
}

export const QuizFooter = function({
  state,
  nextItemId,
  isSubmitting,
}: QuizFooterProps) {
  const { t, ready } = useTranslation('quiz-details-page');

  if (!ready) return null;

  switch (state) {
    case QuizDetailsState.LOADED:
      return (
        <Footer>
          <FooterLink type="submit" form="quizForm" disabled={isSubmitting}>
            {t('form.button.submit.label', 'Submit')}
          </FooterLink>
        </Footer>
      );
    case QuizDetailsState.SUBMITTED:
      return (
        <Footer>
          <FooterLink as={Link} to={`/item/${nextItemId}`}>
            {t('button.next.label', 'Next')}
          </FooterLink>
        </Footer>
      );
    default:
      return null;
  }
};
