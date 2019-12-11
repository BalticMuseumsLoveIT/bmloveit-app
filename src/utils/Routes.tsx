import RoutesPage from 'pages/RoutesPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePage from 'pages/RoutePage';
import LocationPage from 'pages/LocationPage';
import QuizListPage from 'pages/QuizListPage';
import QuizDetailsPage from 'pages/QuizDetailsPage';
import SurveyListPage from 'pages/SurveyListPage';
import SurveyDetailsPage from 'pages/SurveyDetailsPage';
import { Route, Switch } from 'react-router-dom';
import React from 'react';

class Routes extends React.Component {
  public render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/quiz" component={QuizListPage} />
          <Route exact path="/quiz/:id" component={QuizDetailsPage} />
          <Route exact path="/survey" component={SurveyListPage} />
          <Route exact path="/survey/:id" component={SurveyDetailsPage} />
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
