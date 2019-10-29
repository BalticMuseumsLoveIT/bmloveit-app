import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Header';
import AvailableRoutesPage from './pages/AvailableRoutesPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

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
