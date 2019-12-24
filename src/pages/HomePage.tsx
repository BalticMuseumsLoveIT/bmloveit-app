import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, Link } from 'react-router-dom';

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
        <Content>
          HomePage
          <Link to="/qrcode">QR code</Link>
        </Content>
      </>
    );
  }
}

export default HomePage;
