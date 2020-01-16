import HomePage from 'pages/WelcomePage';
import NotFoundPage from 'pages/NotFoundPage';
import QuizListPage from 'pages/QuizListPage';
import QuizDetailsPage from 'pages/QuizDetailsPage';
import SurveyListPage from 'pages/SurveyListPage';
import SurveyDetailsPage from 'pages/SurveyDetailsPage';
import LanguagePage from 'pages/LanguagePage';
import LoginPage from 'pages/LoginPage';
import userStore from 'utils/store/userStore';
import QrCodePage from 'pages/QrCodePage';
import AreaListPage from 'pages/AreaListPage';
import AreaRoutesPage from 'pages/AreaRoutesPage';
import RouteMapPage from 'pages/RouteMapPage';
import RouteEndPage from 'pages/RouteEndPage';
import RouteLocationsListPage from 'pages/RouteLocationsListPage';
import ItemPage from 'pages/ItemPage';
import ProfilePage from 'pages/ProfilePage';
import TeamPage from 'pages/TeamPage';
import AboutPage from 'pages/AboutPage';
import { withLayout } from 'components/Layout/Layout';
import ReactModal from 'react-modal';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import React from 'react';

ReactModal.setAppElement('#root');

const Routes = () => {
  return (
    <Switch>
      <PageRoute exact path="/" component={HomePage} />
      <PageRoute exact path="/about" component={AboutPage} />
      <PageRoute
        exact
        path="/language"
        header={false}
        authorization={false}
        component={LanguagePage}
      />
      <PageRoute
        exact
        path="/login"
        header={false}
        authorization={false}
        component={LoginPage}
      />
      <PageRoute exact path="/area" component={AreaListPage} />
      <PageRoute exact path="/area/:id/routes" component={AreaRoutesPage} />
      <PageRoute exact path="/route/:id/map" component={RouteMapPage} />
      <PageRoute exact path="/route/:id/end" component={RouteEndPage} />
      <PageRoute
        exact
        path="/route/:id/locations"
        component={RouteLocationsListPage}
      />
      <PageRoute exact path="/item/:id" component={ItemPage} />
      <PageRoute exact path="/team" component={TeamPage} />
      <PageRoute exact path="/quiz" component={QuizListPage} />
      <PageRoute exact path="/quiz/:id" component={QuizDetailsPage} />
      <PageRoute exact path="/survey" component={SurveyListPage} />
      <PageRoute exact path="/survey/:id" component={SurveyDetailsPage} />
      <PageRoute exact path="/qrcode" component={QrCodePage} />
      <PageRoute exact path="/profile" component={ProfilePage} />
      <Redirect from="/route/:id" to="/route/:id/map" />
      <PageRoute
        path="*"
        header={false}
        authorization={false}
        component={NotFoundPage}
      />
    </Switch>
  );
};

interface PageRouteProps extends RouteProps {
  header?: boolean;
  authorization?: boolean;
}

const PageRoute = ({
  component: Component,
  header = true,
  authorization = true,
  ...routeProps
}: PageRouteProps) => {
  if (!Component) return null;

  return !authorization || userStore.isLoggedIn ? (
    <Route {...routeProps} component={withLayout(Component, header)} />
  ) : (
    <Redirect
      to={{ pathname: '/login', state: { from: routeProps.location } }}
    />
  );
};

export default Routes;
