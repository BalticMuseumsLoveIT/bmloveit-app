import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';

class NotFoundPage extends React.Component {
  render() {
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