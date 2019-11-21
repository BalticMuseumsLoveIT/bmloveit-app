import { QuizStore } from 'utils/store/quizStore';
import Content from 'components/Content/Content';
import Api from 'utils/api';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  quizStore: QuizStore;
}

@inject('quizStore')
@observer
class QuizPage extends React.Component<Props> {
  componentDidMount(): void {
    Api.getQuizList().then(response => {
      this.props.quizStore.quizList = response;
      // TODO: Handle errors
    });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>Content</Content>
      </>
    );
  }
}

export default QuizPage;
