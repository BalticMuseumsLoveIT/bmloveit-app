import HomePage from 'pages/WelcomePage';
import NotFoundPage from 'pages/NotFoundPage';
import QuizListPage from 'pages/QuizListPage';
import QuizDetailsPage from 'pages/QuizDetailsPage';
import SurveyListPage from 'pages/SurveyListPage';
import SurveyDetailsPage from 'pages/SurveyDetailsPage';
import LanguagePage from 'pages/LanguagePage';
import LoginPage from 'pages/LoginPage';
import authStore from 'utils/store/authStore';
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
import Layout from 'components/Layout/Layout';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import React from 'react';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/language" />
      <PageRoute
        exact
        path="/language"
        displayHeader={false}
        authorization={false}
        component={LanguagePage}
      />
      <PageRoute
        exact
        path="/login"
        displayHeader={false}
        authorization={false}
        component={LoginPage}
      />
      <PageRoute exact path="/welcome" component={HomePage} />
      <PageRoute exact path="/about" component={AboutPage} />
      <PageRoute exact path="/area" component={AreaListPage} />
      <Redirect exact from="/area/:id" to="/area/:id/routes" />
      <PageRoute exact path="/area/:id/routes" component={AreaRoutesPage} />
      <Redirect exact from="/route/:id" to="/route/:id/map" />
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
      <PageRoute
        path="*"
        displayHeader={false}
        authorization={false}
        component={NotFoundPage}
      />
    </Switch>
  );
};

interface PageRouteProps extends RouteProps {
  displayHeader?: boolean;
  authorization?: boolean;
}

const PageRoute = ({
  component: Component,
  displayHeader = true,
  authorization = true,
  ...routeProps
}: PageRouteProps) => {
  if (!Component) return null;

  return !authorization || authStore.isLoggedIn ? (
    <Route
      {...routeProps}
      render={props => (
        <Layout displayHeader={displayHeader}>
          <Component {...props} />
        </Layout>
      )}
    />
  ) : (
    <Redirect
      to={{ pathname: '/login', state: { from: routeProps.location } }}
    />
  );
};

export default Routes;
