import Routes from 'utils/Routes';
import stores from 'utils/store/stores';
import Api from 'utils/api';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

class App extends React.Component {
  componentDidMount = async () => {
    try {
      stores.uiStore.setLanguages(await Api.getLanguageList());
    } catch (e) {}
  };

  render() {
    return (
      <Provider {...stores}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
