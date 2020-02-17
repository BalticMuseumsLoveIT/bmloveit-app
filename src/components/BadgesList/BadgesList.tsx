import { Subtitle } from 'components/Page/Page.style';
import { BadgeInterface, ResourceTypeName } from 'utils/interfaces';
import {
  Badge,
  BadgeIcon,
  BadgeList,
  BadgeListItem,
} from 'components/BadgesList/BadgeList.style';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { getPrivateMediaURL, getResource } from 'utils/helpers';

export interface Props {
  badges: Array<BadgeInterface>;
}

const BadgesList = ({ badges }: Props) => {
  const { t, ready } = useTranslation('profile-page');

  const userHaveBadges = badges.length;

  return userHaveBadges && ready ? (
    <>
      <Subtitle>{t('badges.header', 'Badges')}:</Subtitle>
      <BadgeList>
        {badges.map(badge => {
          const iconResource = getResource(badge, ResourceTypeName.Icon);

          const icon =
            iconResource !== null && iconResource.file_url
              ? getPrivateMediaURL(iconResource.file_url)
              : '/images/badge-icon-placeholder.svg';

          return (
            <BadgeListItem key={badge.id}>
              <Tooltip
                overlay={badge.description}
                overlayClassName="badge-tooltip"
                placement="top"
                trigger="click"
              >
                <Badge>
                  <BadgeIcon src={icon} alt={badge.description} />
                </Badge>
              </Tooltip>
            </BadgeListItem>
          );
        })}
      </BadgeList>
    </>
  ) : null;
};

export default BadgesList;
