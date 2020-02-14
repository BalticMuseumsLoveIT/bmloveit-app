import { LoginButtonPropsInterface } from 'utils/interfaces';
import LoginButton from 'components/Buttons/LoginButtons/LoginButton.style';
import GoogleLogin from 'react-google-login';
import React from 'react';
import { useTranslation } from 'react-i18next';

const GoogleButton = ({ onSuccess, onFailed }: LoginButtonPropsInterface) => {
  const { t, ready } = useTranslation('app');

  const handleSuccessResponse = (response: any) => {
    return onSuccess({
      provider: 'google-oauth2',
      response,
    });
  };

  const handleErrorResponse = (response: any) => {
    return onFailed();
  };

  return ready ? (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
      onSuccess={handleSuccessResponse}
      onFailure={handleErrorResponse}
      cookiePolicy="single_host_origin"
      autoLoad={false}
      render={renderProps => (
        <LoginButton
          iconUrl={'/images/Google__G__Logo.svg'}
          onClick={renderProps.onClick}
          isDisabled={renderProps.disabled}
        >
          {t('button.signInWithGoogle.label', 'Google Sign In')}
        </LoginButton>
      )}
    />
  ) : null;
};

export default GoogleButton;
