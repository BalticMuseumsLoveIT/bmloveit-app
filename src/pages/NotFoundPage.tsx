import React from 'react';
import Helmet from 'react-helmet';
import Content from '../components/Content/Content';

class NotFoundPage extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Helmet>
          <title>404</title>
        </Helmet>
        <Content>404</Content>
      </>
    );
  }
}

export default NotFoundPage;
