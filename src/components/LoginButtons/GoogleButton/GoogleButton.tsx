import React from 'react';
import GoogleLogin from 'react-google-login';

interface Props {
  // TODO: Add types ignoring for this line, because callback is void
  callback: any;
}

class GoogleButton extends React.Component<Props> {
  render() {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText="Login"
        onSuccess={this.props.callback}
        onFailure={this.props.callback}
        cookiePolicy="single_host_origin"
      />
    );
  }
}

export default GoogleButton;
