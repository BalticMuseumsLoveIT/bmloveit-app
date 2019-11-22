import React from 'react';
import FacebookLogin from 'react-facebook-login';

interface Props {
  // TODO: Add types ignoring for this line, because callback is void
  callback: any;
}

class FacebookButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleResponse = this.handleResponse.bind(this);
  }

  render() {
    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
        autoLoad={false}
        fields="name,email,picture"
        callback={this.handleResponse}
      />
    );
  }

  handleResponse = (response: any) => {
    return this.props.callback({
      provider: 'facebook',
      response,
    });
  };
}

export default FacebookButton;
