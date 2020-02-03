import { BadgeInterface } from 'utils/interfaces';
import { useTranslation } from 'react-i18next';
import React from 'react';

export interface Props {
  badges: Array<BadgeInterface>;
}

const BadgesList = ({ badges }: Props) => {
  const { t, ready } = useTranslation('profile-page');

  const userHaveBadges = badges.length;

  return userHaveBadges && ready ? (
    <>
      <h3>{t('badges.header', 'Badges')}:</h3>
      <ul>
        {badges.map(({ id, description }) => (
          <li key={id}>{description}</li>
        ))}
      </ul>
    </>
  ) : null;
};

export default BadgesList;
