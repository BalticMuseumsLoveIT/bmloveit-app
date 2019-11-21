import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

interface Props {}

@observer
class QuizPage extends React.Component<Props> {
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
