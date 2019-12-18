import RoutesPage from 'pages/RoutesPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePage from 'pages/RoutePage';
import QuizListPage from 'pages/QuizListPage';
import QuizDetailsPage from 'pages/QuizDetailsPage';
import SurveyListPage from 'pages/SurveyListPage';
import SurveyDetailsPage from 'pages/SurveyDetailsPage';
import LanguagePage from 'pages/LanguagePage';
import LoginPage from 'pages/LoginPage';
import userStore from 'utils/store/userStore';
import QrCodePage from 'pages/QrCodePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

class Routes extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/language" component={LanguagePage} />
          <Route exact path="/login" component={LoginPage} />
          <AuthRoute exact path="/quiz" component={QuizListPage} />
          <AuthRoute exact path="/quiz/:id" component={QuizDetailsPage} />
          <AuthRoute exact path="/survey" component={SurveyListPage} />
          <AuthRoute exact path="/survey/:id" component={SurveyDetailsPage} />
          <AuthRoute exact path="/routes" component={RoutesPage} />
          <AuthRoute exact path="/routes/:id" component={RoutePage} />
          <AuthRoute exact path="/qrcode" component={QrCodePage} />
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
        userStore.token !== '' ? (
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
