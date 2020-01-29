import React from 'react';
import { useTranslation } from 'react-i18next';

interface GuestButtonProps {
  handleLogin: () => Promise<void>;
}

export const GuestButton = ({ handleLogin }: GuestButtonProps) => {
  const { t, ready } = useTranslation('app');

  return ready ? (
    <button onClick={handleLogin}>
      {t('button.signInAsGuest.label', 'Sign in as Guest')}
    </button>
  ) : null;
};
