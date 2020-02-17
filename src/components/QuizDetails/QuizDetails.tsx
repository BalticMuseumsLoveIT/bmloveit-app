import QuizDetailsStore, {
  QuizDetailsState,
} from 'utils/store/quizDetailsStore';
import QuizForm from 'components/QuizForm/QuizForm';
import { Description } from 'components/Page/Page.style';
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
      return (
        <Description>
          <p>{t('error.notFound', 'Quiz with a given ID was not found')}</p>
        </Description>
      );
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
