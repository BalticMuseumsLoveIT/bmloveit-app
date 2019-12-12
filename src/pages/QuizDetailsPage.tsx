import QuizDetailsStore, {
  QuizDetailsState,
} from 'utils/store/quizDetailsStore';
import Content from 'components/Content/Content';
import QuizFormik from 'components/QuizFormik/QuizFormik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

interface QuizDetailsProps {
  state: QuizDetailsState;
  store: QuizDetailsStore;
}

const QuizDetails = function({ state, store }: QuizDetailsProps) {
  switch (state) {
    case QuizDetailsState.LOADING:
      return <p>Wczytywanie...</p>;
    case QuizDetailsState.LOADED:
    case QuizDetailsState.SUBMITTED:
      return <QuizFormik store={store} />;
    case QuizDetailsState.NOT_FOUND:
      return <p>Quiz o podanym identyfikatorze nie istnieje</p>;
    case QuizDetailsState.ERROR:
      return <p>Wystąpił problem podczas ładowania quizu</p>;
    default:
      return null;
  }
};

interface Props extends RouteComponentProps<any> {}

@observer
class QuizPage extends React.Component<Props> {
  store = new QuizDetailsStore();

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    await this.store.loadQuiz(id);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>Quiz details</h1>
          <QuizDetails state={this.store.state} store={this.store} />
        </Content>
      </>
    );
  }
}

export default QuizPage;
