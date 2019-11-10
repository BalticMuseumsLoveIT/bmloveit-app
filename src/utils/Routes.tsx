import RoutesPage from 'pages/RoutesPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePage from 'pages/RoutePage';
import LocationPage from 'pages/LocationPage';
import { Route, Switch } from 'react-router-dom';
import React from 'react';

interface Props {}

class Routes extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/routes" component={RoutesPage} />
          <Route exact path="/routes/:id" component={RoutePage} />
          <Route exact path="/locations/:id" component={LocationPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

export default Routes;
