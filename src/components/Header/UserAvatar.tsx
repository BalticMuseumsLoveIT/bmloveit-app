import UserAvatarImage from 'components/Header/UserAvatar.style';
import { getPrivateMediaURL } from 'utils/helpers';
import { UserProfileStore } from 'utils/store/userProfileStore';
import React from 'react';
import { inject, observer } from 'mobx-react';

interface InjectedUserAvatarProps {
  userProfileStore: UserProfileStore;
}

@inject('userProfileStore')
@observer
class UserAvatar extends React.Component {
  get injected() {
    return this.props as InjectedUserAvatarProps;
  }

  render() {
    return this.injected.userProfileStore.userHasAvatar ? (
      <UserAvatarImage
        src={getPrivateMediaURL(this.injected.userProfileStore.userAvatarURL)}
        alt={this.injected.userProfileStore.userAvatarName}
      />
    ) : null;
  }
}

export default UserAvatar;
