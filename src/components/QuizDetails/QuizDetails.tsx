import QuizDetailsStore, {
  QuizDetailsState,
} from 'utils/store/quizDetailsStore';
import QuizFormik from 'components/QuizFormik/QuizFormik';
import React from 'react';

export interface QuizDetailsProps {
  state: QuizDetailsState;
  store: QuizDetailsStore;
}

export const QuizDetails = ({ state, store }: QuizDetailsProps) => {
  switch (state) {
    case QuizDetailsState.LOADED:
    case QuizDetailsState.SUBMITTED:
      return <QuizFormik store={store} />;
    case QuizDetailsState.NOT_FOUND:
      return <p>Quiz o podanym identyfikatorze nie istnieje</p>;
    case QuizDetailsState.ERROR:
      return <p>Wystąpił problem podczas ładowania quizu</p>;
    case QuizDetailsState.NOT_LOADED:
    case QuizDetailsState.LOADING:
    default:
      return null;
  }
};
