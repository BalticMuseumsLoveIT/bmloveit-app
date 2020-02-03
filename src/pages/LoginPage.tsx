import Content from 'components/Content/Content';
import GoogleButton from 'components/LoginButtons/GoogleButton/GoogleButton';
import FacebookButton from 'components/LoginButtons/FacebookButton/FacebookButton';
import { AuthStore } from 'utils/store/authStore';
import { OAuthLoginArgumentInterface } from 'utils/interfaces';
import { GuestButton } from 'components/LoginButtons/GuestButton/GuestButton';
import { UserProfileStore } from 'utils/store/userProfileStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps {
  authStore: AuthStore;
  userProfileStore: UserProfileStore;
}

@inject('authStore', 'userProfileStore')
@observer
class LoginPage extends React.Component<Props> {
  authStore = this.props.authStore;
  userProfileStore = this.props.userProfileStore;

  readonly WELCOME_PAGE = '/welcome';

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Login')}</title>
        </Helmet>
        <Content>
          <h2>{this.props.t('content.title', 'Login')}</h2>
          {!this.authStore.isLoggedIn ? (
            <>
              <FacebookButton onSuccess={this.login} />
              <br />
              <GoogleButton onSuccess={this.login} />
              <br />
              <GuestButton loginAsGuest={this.login} />
            </>
          ) : (
            <Redirect to={this.WELCOME_PAGE} />
          )}
        </Content>
      </>
    );
  }

  login = async (params: OAuthLoginArgumentInterface | null = null) => {
    await (params ? this._loginViaOAuth(params) : this._loginAsGuest());
    await this._reloadUserProfile();
    this._redirectToNextPage();
  };

  private _loginViaOAuth = async ({
    provider,
    response,
  }: OAuthLoginArgumentInterface) => {
    await this.authStore.signIn(provider, response.accessToken);
  };

  private _loginAsGuest = async () => {
    await this.authStore.signInAsGuest();
  };

  private _reloadUserProfile = async () => {
    await this.userProfileStore.loadUserProfile();
  };

  private _redirectToNextPage = () => {
    const { location } = this.props;

    const redirectTo =
      (location.state && location.state.from.pathname) || this.WELCOME_PAGE;

    this.props.history.push(redirectTo);
  };
}

export default withTranslation('login-page')(LoginPage);
