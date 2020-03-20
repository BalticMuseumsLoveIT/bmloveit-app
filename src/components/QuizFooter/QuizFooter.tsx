import { QuizDetailsState } from 'utils/store/quizDetailsStore';
import { AppButton } from 'components/Buttons/AppButton.style';
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
        <AppButton type="submit" form="quizForm" disabled={isSubmitting}>
          {t('form.button.submit.label', 'Submit')}
        </AppButton>
      );
    case QuizDetailsState.SUBMITTED:
    case QuizDetailsState.ANSWERED:
      return (
        <AppButton as={Link} to={`/item/${nextItemId}`}>
          {t('button.next.label', 'Next')}
        </AppButton>
      );
    default:
      return null;
  }
};
