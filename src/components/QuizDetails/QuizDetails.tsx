import QuizDetailsStore, {
  QuizDetailsState,
} from 'utils/store/quizDetailsStore';
import QuizForm from 'components/QuizForm/QuizForm';
import { Description } from 'components/Page/Page.style';
import { Error404, Error404Context } from 'components/Error404/Error404';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface QuizDetailsProps {
  state: QuizDetailsState;
  store: QuizDetailsStore;
}

export const QuizDetails = ({ state, store }: QuizDetailsProps) => {
  const { t, ready } = useTranslation('quiz-details-page');

  if (!ready) return null;

  switch (state) {
    case QuizDetailsState.LOADED:
    case QuizDetailsState.SUBMITTED:
      return <QuizForm store={store} />;
    case QuizDetailsState.NOT_FOUND:
      return <Error404 context={Error404Context.QUIZ} />;
    case QuizDetailsState.ERROR:
      return (
        <Description>
          <p>
            {t('error.generic', 'Sorry but quiz cannot be displayed right now')}
          </p>
        </Description>
      );
    case QuizDetailsState.NOT_LOADED:
    case QuizDetailsState.LOADING:
    default:
      return null;
  }
};
