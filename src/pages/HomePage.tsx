import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';

class HomePage extends React.Component {
  render(): React.ReactNode {
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
