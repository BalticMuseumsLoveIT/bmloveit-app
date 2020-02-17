import QuizDetailsStore, {
  QuizDetailsState,
} from 'utils/store/quizDetailsStore';
import QuizForm from 'components/QuizForm/QuizForm';
import { Error404, Error404Context } from 'components/Error404/Error404';
import { Error500 } from 'components/Error500/Error500';
import React from 'react';

export interface QuizDetailsProps {
  state: QuizDetailsState;
  store: QuizDetailsStore;
}

export const QuizDetails = ({ state, store }: QuizDetailsProps) => {
  switch (state) {
    case QuizDetailsState.LOADED:
    case QuizDetailsState.SUBMITTED:
      return <QuizForm store={store} />;
    case QuizDetailsState.NOT_FOUND:
      return <Error404 context={Error404Context.QUIZ} />;
    case QuizDetailsState.ERROR:
      return <Error500 />;
    case QuizDetailsState.NOT_LOADED:
    case QuizDetailsState.LOADING:
    default:
      return null;
  }
};
