import { QuizAnswerResponse } from 'utils/interfaces';
import { Summary } from 'components/QuizForm/QuizSummary.style';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface QuizSummaryProps {
  answer: QuizAnswerResponse | null;
}

export const QuizSummary = function({ answer }: QuizSummaryProps) {
  const { t, ready } = useTranslation('quiz-details-page');

  if (!ready) return null;

  return (
    answer && (
      <Summary isCorrect={answer.correct}>
        {answer.correct
          ? t('summary.correct', 'Congratulations! This is a correct answer')
          : t('summary.incorrect', 'Sorry but selected answer is incorrect')}
      </Summary>
    )
  );
};
