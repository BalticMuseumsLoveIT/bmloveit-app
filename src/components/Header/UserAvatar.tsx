import {
  ItemInterface,
  ResourceTypeName,
  UserProfileInterface,
} from 'utils/interfaces';
import Api from 'utils/api';
import UserAvatarImage from 'components/Header/UserAvatar.style';
import { getPrivateMediaURL } from 'utils/helpers';
import React from 'react';
import { observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';

@observer
class UserAvatar extends React.Component {
  @observable userProfileData: UserProfileInterface | null = null;

  async componentDidMount() {
    const userProfileData = await Api.getUserProfile();
    this.setUserProfileData(userProfileData);
  }

  @action setUserProfileData(userAvatarData: Array<UserProfileInterface>) {
    this.userProfileData = userAvatarData.length ? userAvatarData[0] : null;
  }

  @computed get userAvatar(): ItemInterface | null {
    return this.userProfileData ? this.userProfileData.avatar : null;
  }

  @computed get userAvatarImageURL(): string {
    if (!this.userAvatar || !this.userAvatar.resources_data.length) return '';

    const resource = this.userAvatar.resources_data.find(
      resource => resource.type_name === ResourceTypeName.Image,
    );

    return resource ? resource.file_url : '';
  }

  @computed get userAvatarAlt(): string {
    return this.userAvatar && this.userAvatar.name_full.length
      ? this.userAvatar.name_full
      : '';
  }

  render() {
    return this.userAvatarImageURL ? (
      <UserAvatarImage
        src={getPrivateMediaURL(this.userAvatarImageURL)}
        alt={this.userAvatarAlt}
      />
    ) : null;
  }
}

export default UserAvatar;
