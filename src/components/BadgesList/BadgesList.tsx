import React from 'react';
import { useTranslation } from 'react-i18next';

export interface Props {
  badges: Array<any>;
}

const BadgesList = ({ badges }: Props) => {
  const { t } = useTranslation('profile-page');

  return (
    <>
      <h3>{t('badges.header', 'Badges')}:</h3>
      <ul>
        {badges.map(({ id, description }) => (
          <li key={id}>{description}</li>
        ))}
      </ul>
    </>
  );
};

export default BadgesList;
