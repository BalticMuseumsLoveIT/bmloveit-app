import {
  QuizDetailsState,
  QuizDetailsStore,
} from 'utils/store/quizDetailsStore';
import Content from 'components/Content/Content';
import QuizFormik from 'components/QuizFormik/QuizFormik';
import Api from 'utils/api';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props extends RouteComponentProps<any> {
  quizStore: QuizDetailsStore;
}

@inject('quizStore')
@observer
class QuizPage extends React.Component<Props> {
  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    this.props.quizStore.loadingQuizDetails();

    try {
      const response = await Api.getQuiz(id);
      this.props.quizStore.loadQuizDetails(response);
    } catch (error) {
      this.props.quizStore.handleQuizDetailsError(error);
    }
  }

  render() {
    const quiz = (state: QuizDetailsState) => {
      switch (state) {
        case QuizDetailsState.LOADING:
          return <p>Wczytywanie...</p>;
        case QuizDetailsState.LOADED:
        case QuizDetailsState.SUBMITTED:
          return <QuizFormik quizStore={this.props.quizStore} />;
        case QuizDetailsState.NOT_FOUND:
          return <p>Quiz o podanym identyfikatorze nie istnieje</p>;
        case QuizDetailsState.ERROR:
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
