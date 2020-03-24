import QuizListStore from 'utils/store/quizListStore';
import Content from 'components/Content/Content';
import { QuizList } from 'components/QuizList/QuizList';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

@observer
class QuizListPage extends React.Component {
  quizListStore = new QuizListStore(true);

  async componentDidMount() {
    await this.quizListStore.loadList();
  }

  componentWillUnmount(): void {
    this.quizListStore.unmount();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>List of active quizzes</h1>
          <QuizList
            list={this.quizListStore.list}
            state={this.quizListStore.state}
          />
        </Content>
      </>
    );
  }
}

export default QuizListPage;
