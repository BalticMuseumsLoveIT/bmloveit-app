import QuizDetailsStore, {
  QuizDetailsState,
} from 'utils/store/quizDetailsStore';
import QuizForm from 'components/QuizForm/QuizForm';
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
      return <p>Quiz o podanym identyfikatorze nie istnieje</p>;
    case QuizDetailsState.ERROR:
      return <p>Wystąpił problem podczas ładowania quizu</p>;
    case QuizDetailsState.NOT_LOADED:
    case QuizDetailsState.LOADING:
    default:
      return null;
  }
};
