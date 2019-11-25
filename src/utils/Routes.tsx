import RoutesPage from 'pages/RoutesPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePage from 'pages/RoutePage';
import LocationPage from 'pages/LocationPage';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import QuizPage from '../pages/QuizPage';
import QuizDetailsPage from '../pages/QuizDetailsPage';

class Routes extends React.Component {
  public render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/quiz" component={QuizPage} />
          <Route exact path="/quiz/:id" component={QuizDetailsPage} />
          <Route exact path="/routes" component={RoutesPage} />
          <Route exact path="/routes/:id" component={RoutePage} />
          <Route
            exact
            path="/routes/:routeId/locations/:id"
            component={LocationPage}
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

export default Routes;
