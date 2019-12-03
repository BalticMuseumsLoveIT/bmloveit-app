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
  async componentDidMount(): Promise<void> {
    this.props.quizStore.quizList = await Api.getQuizList();
    // TODO: Handle errors
  }

  render() {
    const list = this.props.quizStore.quizList.map(quiz => (
      <p key={quiz.id}>
        <a href={`/quiz/${quiz.id}`}>{quiz.name}</a>
      </p>
    ));

    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>List of active quizzes</h1>
          {list}
        </Content>
      </>
    );
  }
}

export default QuizPage;
