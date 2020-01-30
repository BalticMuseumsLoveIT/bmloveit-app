import Routes from 'utils/Routes';
import stores from 'utils/store/stores';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

class App extends React.Component {
  componentDidMount = async () => {
    try {
      await Promise.all([
        stores.uiStore.loadLanguages(),
        stores.userProfileStore.loadUserProfile(),
      ]);
    } catch (e) {}
  };

  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
