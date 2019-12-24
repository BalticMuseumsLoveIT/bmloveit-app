import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class HomePage extends React.Component<Props> {
  render() {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Content>HomePage</Content>
      </>
    );
  }
}

export default HomePage;
