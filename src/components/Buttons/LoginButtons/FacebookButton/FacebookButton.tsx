import { LoginButtonPropsInterface } from 'utils/interfaces';
import LoginButton, {
  Icon,
  Label,
  Wrapper,
} from 'components/Buttons/LoginButtons/LoginButton.style';
import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useTranslation } from 'react-i18next';

const FacebookButton = ({ onSuccess, onFailed }: LoginButtonPropsInterface) => {
  const { t, ready } = useTranslation('app');

  const handleSuccessResponse = (response: any) => {
    return onSuccess({
      provider: 'facebook',
      response,
    });
  };

  const handleErrorResponse = (response: any) => {
    return onFailed();
  };

  return ready ? (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleSuccessResponse}
      onFailure={handleErrorResponse}
      render={(renderProps: any) => (
        <LoginButton
          onClick={renderProps.onClick}
          isDisabled={renderProps.isDisabled}
        >
          <Wrapper>
            <Icon src={'/images/F_icon.svg'} />
            <Label>
              {t('button.signInWithFacebook.label', 'Facebook Sign In')}
            </Label>
          </Wrapper>
        </LoginButton>
      )}
    />
  ) : null;
};

export default FacebookButton;
