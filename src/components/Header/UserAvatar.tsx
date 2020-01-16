import UserAvatarImage from 'components/Header/UserAvatar.style';
import { getPrivateMediaURL } from 'utils/helpers';
import { UserStore } from 'utils/store/userStore';
import React from 'react';
import { inject, observer } from 'mobx-react';

interface InjectedUserAvatarProps {
  userStore: UserStore;
}

@inject('userStore')
@observer
class UserAvatar extends React.Component {
  get injected() {
    return this.props as InjectedUserAvatarProps;
  }

  userAvatarStore = this.injected.userStore.userAvatarStore;

  async componentDidMount() {
    await this.userAvatarStore.load();
  }

  render() {
    return this.userAvatarStore.userAvatarImageURL ? (
      <UserAvatarImage
        src={getPrivateMediaURL(this.userAvatarStore.userAvatarImageURL)}
        alt={this.userAvatarStore.userAvatarAlt}
      />
    ) : null;
  }
}

export default UserAvatar;
