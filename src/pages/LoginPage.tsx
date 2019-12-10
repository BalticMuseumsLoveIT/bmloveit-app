import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import GoogleButton from 'components/LoginButtons/GoogleButton/GoogleButton';
import FacebookButton from 'components/LoginButtons/FacebookButton/FacebookButton';
import { UserStore } from 'utils/store/userStore';
import Api from 'utils/api';
import { OAuthLoginArgumentInterface } from 'utils/interfaces';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  uiStore: UiStore;
  userStore: UserStore;
}

@inject('uiStore', 'userStore')
@observer
class LoginPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Content>
          LoginPage
          <FacebookButton onSuccess={this.login} />
          <GoogleButton onSuccess={this.login} />
          <button onClick={() => this.props.userStore.setToken('')}>
            Logout
          </button>
        </Content>
      </>
    );
  }

  async login({
    provider,
    response,
  }: OAuthLoginArgumentInterface): Promise<void> {
    const data = await Api.signIn(provider, response.accessToken);
    this.props.userStore.setToken(data.access_token);

    const { location } = this.props;
    const redirectTo = (location.state && location.state.from.pathname) || '/';
    this.props.history.push(redirectTo);
  }
}

export default LoginPage;
