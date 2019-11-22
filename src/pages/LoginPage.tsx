import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import GoogleButton from 'components/LoginButtons/GoogleButton/GoogleButton';
import FacebookButton from 'components/LoginButtons/FacebookButton/FacebookButton';
import { UserStore } from 'utils/store/userStore';
import tempUserData from 'utils/tempUserData.json';
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
  render() {
    return (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Content>
          LoginPage
          <FacebookButton callback={this.responseOauth} />
          <GoogleButton callback={this.responseOauth} />
          <button onClick={this.responseOauth}>Login</button>
          <button
            onClick={(): void => console.log(this.props.userStore.getToken())}
          >
            ShowToken
          </button>
        </Content>
      </>
    );
  }

  // This callback should return void
  responseOauth = ({ provider, response }: any): any => {
    console.log(response);
    this.props.userStore.setToken(tempUserData.token);

    const { location } = this.props;
    const redirectTo = (location.state && location.state.from.pathname) || '/';

    this.props.history.push(redirectTo);
  };
}

export default LoginPage;
