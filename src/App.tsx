import Layout from 'components/Layout/Layout';
import Routes from 'utils/Routes';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
