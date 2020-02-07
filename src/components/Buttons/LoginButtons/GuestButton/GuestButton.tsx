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
    <button onClick={handleClick}>
      {t('button.signInAsGuest.label', 'Sign in as Guest')}
    </button>
  ) : null;
};
