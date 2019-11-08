import AvailableRoutesPage from 'pages/AvailableRoutesPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePage from 'pages/RoutePage';
import { Route, Switch } from 'react-router-dom';
import React from 'react';

interface Props {}

class Routes extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/routes" component={AvailableRoutesPage} />
          <Route exact path="/routes/:id" component={RoutePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

export default Routes;
