import { LoginButtonPropsInterface } from 'utils/interfaces';
import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookButton extends React.Component<LoginButtonPropsInterface> {
  render() {
    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
        autoLoad={false}
        fields="name,email,picture"
        callback={this.handleSuccessResponse}
      />
    );
  }

  handleSuccessResponse = (response: any) => {
    return this.props.onSuccess({
      provider: 'facebook',
      response,
    });
  };
}

export default FacebookButton;
