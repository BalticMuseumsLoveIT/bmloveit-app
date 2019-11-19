import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  history: History;
  location: Location;
  uiStore: UiStore;
}

@inject('uiStore')
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
