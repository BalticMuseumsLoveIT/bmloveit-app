import Content from 'components/Content/Content';
import GoogleButton from 'components/Buttons/LoginButtons/GoogleButton/GoogleButton';
import FacebookButton from 'components/Buttons/LoginButtons/FacebookButton/FacebookButton';
import { AuthStore } from 'utils/store/authStore';
import { OAuthLoginArgumentInterface } from 'utils/interfaces';
import { GuestButton } from 'components/Buttons/LoginButtons/GuestButton/GuestButton';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { LayoutGridFooter } from 'components/Layout/Layout.style';
import { SponsorLogotype } from 'components/SponsorLogotype/SponsorLogotype';
import { SiteStore } from 'utils/store/siteStore';
import MuseumLogo from 'components/MuseumLogo/MuseumLogo';
import { LogoType } from 'components/MuseumLogo/MuseumLogo.style';
import { Message } from 'components/Page/Page.style';
import LoginPageStore from 'utils/store/LoginPageStore';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps {
  authStore: AuthStore;
  userProfileStore: UserProfileStore;
  siteStore: SiteStore;
}

@inject('authStore', 'userProfileStore', 'siteStore')
@observer
class LoginPage extends React.Component<Props> {
  authStore = this.props.authStore;
  userProfileStore = this.props.userProfileStore;
  siteStore = this.props.siteStore;

  loginPageStore = new LoginPageStore();

  readonly WELCOME_PAGE = '/welcome';

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Login')}</title>
        </Helmet>
        <Content backgroundImage={this.siteStore.image || undefined}>
          <MuseumLogo type={LogoType.WELCOME} />
          {this.loginPageStore.isOAuthFailed && (
            <Message isError={this.loginPageStore.isOAuthFailed}>
              {
                <ItemHtmlParser
                  html={this.props.t(
                    'content.message.error',
                    'Ups, something went wrong.<br>Try again!',
                  )}
                />
              }
            </Message>
          )}
          {!this.authStore.isLoggedIn ? (
            <>
              <GoogleButton
                onSuccess={this.login}
                onFailed={this._handleError}
              />
              <FacebookButton
                onSuccess={this.login}
                onFailed={this._handleError}
              />
              <GuestButton loginAsGuest={this.login} />
            </>
          ) : (
            <Redirect to={this.WELCOME_PAGE} />
          )}
        </Content>
        <LayoutGridFooter>
          <SponsorLogotype />
        </LayoutGridFooter>
      </>
    );
  }

  login = async (params: OAuthLoginArgumentInterface | null = null) => {
    await (params ? this._loginViaOAuth(params) : this._loginAsGuest());
    await this._reloadUserProfile();
    this._redirectToNextPage();
  };

  private _handleError = async () => {
    this.loginPageStore.setIsOAutoFailed(true);
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
