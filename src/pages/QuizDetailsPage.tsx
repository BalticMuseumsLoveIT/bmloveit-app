import { QuizState, QuizStore } from 'utils/store/quizStore';
import Content from 'components/Content/Content';
import Api from 'utils/api';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  quizStore: QuizStore;
  match: Record<string, any>;
}

@inject('quizStore')
@observer
class QuizPage extends React.Component<Props> {
  componentDidMount(): void {
    const {
      params: { id },
    } = this.props.match;

    this.props.quizStore.loadingQuizDetails();

    Api.getQuiz(id)
      .then(response => {
        this.props.quizStore.loadQuizDetails(response);
      })
      .catch(error => {
        this.props.quizStore.handleQuizDetailsError(error);
      });
  }

  render() {
    const quiz = (state: QuizState) => {
      switch (state) {
        case QuizState.LOADING:
          return <p>Wczytywanie...</p>;
        case QuizState.LOADED:
          return <p>FORMULARZ_Z_QUIZEM</p>;
        case QuizState.NOT_FOUND:
          return <p>Quiz o podanym identyfikatorze nie istnieje</p>;
        case QuizState.ERROR:
          return <p>Wystąpił problem podczas ładowania quizu</p>;
        default:
          return null;
      }
    };

    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>Quiz details</h1>
          <div>{quiz(this.props.quizStore.quizState)}</div>
        </Content>
      </>
    );
  }
}

export default QuizPage;
