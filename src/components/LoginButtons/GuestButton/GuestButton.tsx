import React from 'react';
import { useTranslation } from 'react-i18next';

interface GuestButtonProps {
  onClick: () => Promise<void>;
}

export const GuestButton = ({ onClick: loginAsGuest }: GuestButtonProps) => {
  const { t, ready } = useTranslation('app');

  return ready ? (
    <button onClick={loginAsGuest}>
      {t('button.signInAsGuest.label', 'Sign in as Guest')}
    </button>
  ) : null;
};
