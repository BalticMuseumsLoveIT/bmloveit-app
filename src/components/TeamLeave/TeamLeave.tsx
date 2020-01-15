import React from 'react';
import { useTranslation } from 'react-i18next';

interface TeamLeaveProps extends React.ComponentPropsWithRef<'button'> {}

export const TeamLeave = React.forwardRef<HTMLButtonElement, TeamLeaveProps>(
  function TeamLeave({ ...props }: TeamLeaveProps, ref) {
    const { t, ready } = useTranslation('team-page');

    if (!ready) return null;

    return (
      <button ref={ref} {...props}>
        {t('button.leaveTeam', 'Leave team')}
      </button>
    );
  },
);
