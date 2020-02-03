import { Line as ProgressBar } from 'rc-progress';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface Props {
  points: number;
  nextLevelStart: number | null;
}

export const UserPoints = ({ points, nextLevelStart }: Props) => {
  const { t, ready } = useTranslation('profile-page');

  if (!ready || points <= 0) return null;

  nextLevelStart = nextLevelStart || 0;

  const haveNextLevel = nextLevelStart > points;

  const progress = haveNextLevel ? (100 * points) / nextLevelStart : 0;

  const userPoints = haveNextLevel
    ? `${points} / ${nextLevelStart}`
    : `${points}`;

  return (
    <>
      {haveNextLevel && <ProgressBar percent={progress} />}
      <p>
        {t('userProgressPoints', 'Points: {{ userPoints }}', {
          userPoints: userPoints,
        })}
      </p>
    </>
  );
};
