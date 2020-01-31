import { UserProfileInterface } from 'utils/interfaces';
import Api from 'utils/api';
import ItemStore from 'utils/store/itemStore';
import { action, computed, observable } from 'mobx';

export class UserProfileStore {
  @observable userProfileData: UserProfileInterface | null = null;
  @observable userAvatarItemStore: ItemStore = new ItemStore();

  @action setUserProfile = (userProfileData: UserProfileInterface | null) => {
    this.userProfileData = userProfileData;
    this.userAvatarItemStore.setItemData(
      userProfileData ? userProfileData.avatar : null,
    );
  };

  @action loadUserProfile = async () => {
    const userProfileResponse = await Api.getUserProfile();

    this.setUserProfile(
      userProfileResponse.length ? userProfileResponse[0] : null,
    );
  };

  @computed get userName(): string {
    if (this.userProfileData === null) return '';

    const { username, first_name, last_name } = this.userProfileData;

    return first_name && last_name ? `${first_name} ${last_name}` : username;
  }

  @computed get userHasAvatar(): boolean {
    return this.userAvatarItemStore.itemData !== null;
  }

  @computed get userAvatarURL(): string {
    return this.userAvatarItemStore.itemImage
      ? this.userAvatarItemStore.itemImage.file_url
      : '';
  }

  @computed get userAvatarName(): string {
    return this.userAvatarItemStore.itemNameFull;
  }
}

const userProfileStore = new UserProfileStore();

export default userProfileStore;
