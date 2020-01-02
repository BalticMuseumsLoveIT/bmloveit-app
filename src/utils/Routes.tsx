import HomePage from 'pages/HomePage';
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
import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

class Routes extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <AuthRoute exact path="/" component={HomePage} />
          <Route exact path="/language" component={LanguagePage} />
          <Route exact path="/login" component={LoginPage} />
          <AuthRoute exact path="/area" component={AreaListPage} />
          <AuthRoute exact path="/area/:id/routes" component={AreaRoutesPage} />
          <AuthRoute exact path="/route/:id/map" component={RouteMapPage} />
          <AuthRoute exact path="/route/:id/end" component={RouteEndPage} />
          <AuthRoute
            exact
            path="/route/:id/locations"
            component={RouteLocationsListPage}
          />
          <AuthRoute exact path="/item/:id" component={ItemPage} />
          <AuthRoute exact path="/quiz" component={QuizListPage} />
          <AuthRoute exact path="/quiz/:id" component={QuizDetailsPage} />
          <AuthRoute exact path="/survey" component={SurveyListPage} />
          <AuthRoute exact path="/survey/:id" component={SurveyDetailsPage} />
          <AuthRoute exact path="/qrcode" component={QrCodePage} />
          <AuthRoute exact path="/profile" component={ProfilePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

// AuthRoute's props should be type RouteProps, but typescript throws error:
// "JSX element type 'Page' does not have any construct or call signatures.ts(2604)"
const AuthRoute = ({ component: Page, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props =>
        userStore.isLoggedIn ? (
          <Page {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default Routes;
