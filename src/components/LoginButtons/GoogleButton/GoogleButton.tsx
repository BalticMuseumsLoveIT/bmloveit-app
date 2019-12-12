import { LoginButtonPropsInterface } from 'utils/interfaces';
import React from 'react';
import GoogleLogin from 'react-google-login';

class GoogleButton extends React.Component<LoginButtonPropsInterface> {
  render() {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        onSuccess={this.handleSuccessResponse}
        onFailure={() => undefined}
        cookiePolicy="single_host_origin"
      />
    );
  }

  handleSuccessResponse = (response: any) => {
    return this.props.onSuccess({
      provider: 'google-oauth2',
      response,
    });
  };
}

export default GoogleButton;
