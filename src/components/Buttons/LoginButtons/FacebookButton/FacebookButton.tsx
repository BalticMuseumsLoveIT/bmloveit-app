import { LoginButtonPropsInterface } from 'utils/interfaces';
import LoginButton from 'components/Buttons/LoginButtons/LoginButton.style';
import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useTranslation } from 'react-i18next';

const FacebookButton = ({ onSuccess }: LoginButtonPropsInterface) => {
  const { t, ready } = useTranslation('app');

  const handleSuccessResponse = (response: any) => {
    return onSuccess({
      provider: 'facebook',
      response,
    });
  };

  return ready ? (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleSuccessResponse}
      render={(renderProps: any) => (
        <LoginButton
          iconUrl={'/images/F_icon.svg'}
          onClick={renderProps.onClick}
          isDisabled={renderProps.isDisabled}
        >
          {t('button.signInWithFacebook.label', 'Facebook Sign In')}
        </LoginButton>
      )}
    />
  ) : null;
};

export default FacebookButton;
