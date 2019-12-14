import QuizDetailsStore from 'utils/store/quizDetailsStore';
import Content from 'components/Content/Content';
import { QuizDetails } from 'components/QuizDetails/QuizDetails';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

interface Props extends RouteComponentProps<any> {}

@observer
class QuizPage extends React.Component<Props> {
  quizDetailsStore = new QuizDetailsStore();

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    await this.quizDetailsStore.loadQuiz(id);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>Quiz details</h1>
          <QuizDetails
            state={this.quizDetailsStore.state}
            store={this.quizDetailsStore}
          />
        </Content>
      </>
    );
  }
}

export default QuizPage;
