import {
  UserAvatarImage,
  UserAvatarLink,
} from 'components/Header/UserAvatar.style';
import { getPrivateMediaURL } from 'utils/helpers';
import { UserProfileStore } from 'utils/store/userProfileStore';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {}

interface InjectedProps extends Props {
  userProfileStore: UserProfileStore;
}

@inject('userProfileStore')
@observer
class UserAvatar extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  render() {
    return this.injected.userProfileStore.userHasAvatar ? (
      <UserAvatarLink to="/profile">
        <UserAvatarImage
          src={getPrivateMediaURL(this.injected.userProfileStore.userAvatarURL)}
          alt={this.injected.userProfileStore.userAvatarName}
        />
      </UserAvatarLink>
    ) : null;
  }
}

export default withRouter(UserAvatar);
