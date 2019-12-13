import QuizListStore from 'utils/store/quizListStore';
import Content, { ContentState } from 'components/Content/Content';
import { QuizInterface } from 'utils/interfaces';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { PageStore } from '../utils/store/pageStore';

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

interface Props {
  pageStore: PageStore;
}

@inject('pageStore')
@observer
class QuizListPage extends React.Component<Props> {
  quizListStore = new QuizListStore();
  pageStore = this.props.pageStore;

  constructor(props: Props) {
    super(props);
    this.pageStore.setContentState(ContentState.UNAVAILABLE);
  }

  async componentDidMount() {
    try {
      this.pageStore.setContentState(ContentState.LOADING);
      await this.quizListStore.loadList();
      this.pageStore.setContentState(ContentState.AVAILABLE);
    } catch (e) {
      this.pageStore.setContentState(ContentState.ERROR);
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <Content>
          <h1>List of active quizzes</h1>
          <Content state={this.pageStore.contentState}>
            <List list={this.quizListStore.list} />
          </Content>
        </Content>
      </>
    );
  }
}

export default QuizListPage;
