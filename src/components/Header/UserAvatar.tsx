import UserAvatarImage from 'components/Header/UserAvatar.style';
import { getPrivateMediaURL } from 'utils/helpers';
import UserAvatarStore from 'utils/store/userAvatarStore';
import React from 'react';
import { observer } from 'mobx-react';

@observer
class UserAvatar extends React.Component {
  userAvatarStore = new UserAvatarStore();

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
