import { QuizAnswerResponse } from 'utils/interfaces';
import { Link } from 'react-router-dom';
import React from 'react';

export interface QuizSummaryProps {
  answer: QuizAnswerResponse | null;
}

export const QuizSummary = function({ answer }: QuizSummaryProps) {
  return (
    answer && (
      <div>
        <p>
          {answer.correct
            ? 'Congratulations! This is a correct answer'
            : 'Sorry but selected answer is incorrect'}
        </p>
        <p>
          <Link to="/quiz">Go to the list of active quizzes</Link>
        </p>
      </div>
    )
  );
};
