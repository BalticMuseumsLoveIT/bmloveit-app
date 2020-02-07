import {
  UserAvatar,
  UserAvatarProps,
  UserAvatarType,
} from 'components/Avatar/Avatar.style';
import { getPrivateMediaURL } from 'utils/helpers';
import { UserProfileStore } from 'utils/store/userProfileStore';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Props
  extends Omit<UserAvatarProps, 'usePlaceholder'>,
    RouteComponentProps {}

interface InjectedProps extends Props {
  userProfileStore: UserProfileStore;
}

@inject('userProfileStore')
@observer
class Avatar extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  render() {
    const shouldUsePlaceholder =
      this.injected.userProfileStore.userAvatarURL.length === 0;

    const shouldLinkToProfile =
      this.props.type === UserAvatarType.HEADER &&
      this.props.location.pathname !== '/profile';

    const avatarImageSrc = shouldUsePlaceholder
      ? '/images/avatar-placeholder.svg'
      : getPrivateMediaURL(this.injected.userProfileStore.userAvatarURL);

    const image = (
      <img
        src={avatarImageSrc}
        alt={this.injected.userProfileStore.userAvatarName}
      />
    );

    return this.injected.userProfileStore.userHasAvatar ? (
      <UserAvatar type={this.props.type} usePlaceholder={shouldUsePlaceholder}>
        {shouldLinkToProfile ? <Link to="/profile">{image}</Link> : image}
      </UserAvatar>
    ) : null;
  }
}

export default withRouter(Avatar);
