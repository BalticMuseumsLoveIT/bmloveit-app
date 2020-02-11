import {
  ProgressBarContainer,
  ProgressBarSummary,
} from 'pages/ProfilePage.style';
import { Line as ProgressBar } from 'rc-progress';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { darken, desaturate } from 'polished';

interface Props {
  points: number;
  nextLevelStart: number | null;
}

export const UserPoints = ({ points, nextLevelStart }: Props) => {
  const { t, ready } = useTranslation('profile-page');

  const themeContext = useContext(ThemeContext);

  if (!ready || points <= 0) return null;

  nextLevelStart = nextLevelStart || 0;

  const haveNextLevel = nextLevelStart > points;

  const progress = haveNextLevel ? (100 * points) / nextLevelStart : 0;

  const userPoints = haveNextLevel
    ? `${points} / ${nextLevelStart}`
    : `${points}`;

  return (
    <ProgressBarContainer>
      {haveNextLevel && (
        <ProgressBar
          percent={progress}
          strokeColor={themeContext.colors.background.alternative}
          trailColor={desaturate(
            0.2,
            darken(0.1, themeContext.colors.background.app),
          )}
          strokeWidth={2}
          trailWidth={2}
        />
      )}
      <ProgressBarSummary>
        {t('userProgressPoints', 'Points: {{ userPoints }}', {
          userPoints: userPoints,
        })}
      </ProgressBarSummary>
    </ProgressBarContainer>
  );
};
