import { QuizInterface } from 'utils/interfaces';
import { QuizListState } from 'utils/store/quizListStore';
import { Link } from 'react-router-dom';
import React from 'react';

export interface QuizListProps {
  list: Array<QuizInterface>;
  state: QuizListState;
}

export const QuizList = ({ list, state }: QuizListProps) => {
  switch (state) {
    case QuizListState.LOADED:
      return (
        <>
          {list.map(quiz => (
            <p key={quiz.id}>
              <Link to={`/quiz/${quiz.id}`}>{quiz.name}</Link>
            </p>
          ))}
        </>
      );
    case QuizListState.ERROR:
      return <h1>List could not be loaded</h1>;
    case QuizListState.NOT_LOADED:
    case QuizListState.LOADING:
    default:
      return null;
  }
};
