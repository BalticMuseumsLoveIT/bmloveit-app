import { QuizAnswerResponse } from 'utils/interfaces';
import { Summary } from 'components/QuizForm/QuizSummary.style';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface QuizSummaryProps {
  answer: QuizAnswerResponse | null;
  isAnswered?: boolean;
}

export const QuizSummary = function({ answer, isAnswered }: QuizSummaryProps) {
  const { t, ready } = useTranslation('quiz-details-page');

  if (!ready) return null;

  return isAnswered ? (
    <Summary>
      {t('summary.answered', 'This quiz has been already answered')}
    </Summary>
  ) : (
    answer && (
      <Summary isCorrect={answer.correct}>
        {answer.correct
          ? t('summary.correct', 'Congratulations! This is a correct answer')
          : t('summary.incorrect', 'Sorry but selected answer is incorrect')}
      </Summary>
    )
  );
};
