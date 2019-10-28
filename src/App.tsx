import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AvailableRoutesPage from './pages/AvailableRoutesPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/available-routes">
            <AvailableRoutesPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
