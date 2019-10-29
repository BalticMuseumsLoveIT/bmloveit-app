import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import AvailableRoutesPage from './pages/AvailableRoutesPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import RoutePage from './pages/RoutePage';
import Layout from './components/Layout/Layout';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Layout>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/routes" component={AvailableRoutesPage} />
            <Route exact path="/routes/:id" component={RoutePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
