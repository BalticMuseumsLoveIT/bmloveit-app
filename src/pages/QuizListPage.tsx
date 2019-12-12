import QuizListStore, { QuizListState } from 'utils/store/quizListStore';
import Content from 'components/Content/Content';
import { QuizInterface } from 'utils/interfaces';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

interface QuizListProps {
  state: QuizListState;
  list: Array<QuizInterface>;
}

const QuizList = function({ state, list }: QuizListProps) {
  switch (state) {
    case QuizListState.LOADING:
      return <p>Loading...</p>;
    case QuizListState.LOADED:
      return <List list={list} />;
    case QuizListState.ERROR:
      return <p>Error</p>;
    default:
      return null;
  }
};

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

interface Props {}

@observer
class QuizListPage extends React.Component<Props> {
  store = new QuizListStore();

  async componentDidMount() {
    await this.store.loadList();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>List of active quizzes</h1>
          <QuizList state={this.store.state} list={this.store.list} />
        </Content>
      </>
    );
  }
}

export default QuizListPage;
