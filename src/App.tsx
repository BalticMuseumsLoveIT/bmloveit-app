import Routes from 'utils/Routes';
import stores from 'utils/store/stores';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

class App extends React.Component {
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
