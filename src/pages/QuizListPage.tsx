import QuizListStore from 'utils/store/quizListStore';
import Content from 'components/Content/Content';
import { QuizInterface } from 'utils/interfaces';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

interface ListProps {
  list: Array<QuizInterface>;
}

const List = function({ list }: ListProps) {
  return (
    <>
      {list.map(quiz => (
        <p key={quiz.id}>
          <Link to={`/quiz/${quiz.id}`}>{quiz.name}</Link>
        </p>
      ))}
    </>
  );
};

@observer
class QuizListPage extends React.Component {
  quizListStore = new QuizListStore(true);

  async componentDidMount() {
    await this.quizListStore.loadList();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>List of active quizzes</h1>
          <List list={this.quizListStore.list} />
        </Content>
      </>
    );
  }
}

export default QuizListPage;
