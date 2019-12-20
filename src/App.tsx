import Layout from 'components/Layout/Layout';
import Routes from 'utils/Routes';
import stores from 'utils/store/stores';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

class App extends React.Component {
  render() {
    return (
      <Suspense fallback="loading">
        <Provider {...stores}>
          <BrowserRouter>
            <Layout>
              <Routes />
            </Layout>
          </BrowserRouter>
        </Provider>
      </Suspense>
    );
  }
}

export default App;
