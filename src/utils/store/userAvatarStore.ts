import {
  ItemInterface,
  ResourceTypeName,
  UserProfileInterface,
} from 'utils/interfaces';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';

export default class UserAvatarStore {
  @observable userProfileData: UserProfileInterface | null = null;

  @action async load() {
    const userProfileData = await Api.getUserProfile();
    this.setUserProfileData(userProfileData);
  }

  @action setUserProfileData(userAvatarData: UserProfileInterface) {
    this.userProfileData = userAvatarData !== null ? userAvatarData : null;
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
}
