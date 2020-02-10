import LoginButton from 'components/Buttons/LoginButtons/LoginButton.style';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface GuestButtonProps {
  loginAsGuest: () => Promise<void>;
}

export const GuestButton = ({ loginAsGuest }: GuestButtonProps) => {
  const { t, ready } = useTranslation('app');

  const handleClick = async () => {
    /**
     * Do not assign loginAsGuest directly to button.onClick
     * to prevent SyntheticEvent being passed as an argument
     */
    await loginAsGuest();
  };

  return ready ? (
    <LoginButton onClick={handleClick} iconUrl={'/images/person-24px.svg'}>
      {t('button.signInAsGuest.label', 'Sign in as Guest')}
    </LoginButton>
  ) : null;
};
