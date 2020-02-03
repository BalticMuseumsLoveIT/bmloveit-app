import {
  BadgeInterface,
  ItemType,
  UserProfileInterface,
} from 'utils/interfaces';
import Api from 'utils/api';
import ItemStore from 'utils/store/itemStore';
import TeamStore from 'utils/store/teamStore';
import { action, computed, observable } from 'mobx';

export class UserProfileStore {
  @observable userProfileData: UserProfileInterface | null = null;
  @observable userAvatarStore: ItemStore = new ItemStore();
  @observable userTeamStore: TeamStore = new TeamStore();

  @action setUserProfile = async (
    userProfileData: UserProfileInterface | null,
  ) => {
    this.userProfileData = userProfileData;

    if (this.userProfileData !== null) {
      this.userAvatarStore.setItemData(this.userProfileData.avatar);

      if (this.userProfileData.team !== null) {
        await this.userTeamStore.loadTeamData(this.userProfileData.team);
      } else {
        this.userTeamStore.setTeamData(null);
      }
    }
  };

  @action loadUserProfile = async () => {
    const userProfileResponse = await Api.getUserProfile();

    await this.setUserProfile(
      userProfileResponse.length ? userProfileResponse[0] : null,
    );
  };

  @computed get userName(): string {
    if (this.userProfileData === null) return '';

    const { username, first_name, last_name } = this.userProfileData;

    return first_name && last_name ? `${first_name} ${last_name}` : username;
  }

  @computed get userHasAvatar(): boolean {
    return this.userAvatarStore.itemData !== null;
  }

  @computed get userAvatarURL(): string {
    return this.userAvatarStore.itemImage
      ? this.userAvatarStore.itemImage.file_url
      : '';
  }

  @computed get userAvatarName(): string {
    return this.userAvatarStore.itemNameFull;
  }

  @computed get userIsTeamMember(): boolean {
    return this.userTeamStore.isTeamLoaded;
  }

  @computed get userCards(): Array<ItemStore> {
    if (
      this.userProfileData === null ||
      this.userProfileData.owned_items_data.length === 0
    )
      return [];

    return this.userProfileData.owned_items_data
      .filter(({ item_data: item }) => {
        return item.type_data && item.type_data.name === ItemType.CARD;
      })
      .map(ownedItem => new ItemStore(ownedItem.item_data));
  }

  @computed get userBadges(): Array<BadgeInterface> {
    return this.userProfileData ? this.userProfileData.badges_data : [];
  }

  @computed get pointsData(): {
    shouldDisplayProgressBar: boolean;
    value: number;
  } {
    let pointsData = {
      shouldDisplayProgressBar: false,
      value: 0,
    };

    if (this.userProfileData === null) {
      return pointsData;
    }

    const userPoints = this.userProfileData.points || 0;
    const levelUpPoints = this.userProfileData.level_up_points || 0;
    const pointsRequiredForCurrentLevel =
      this.userProfileData.level_current_points || 0;

    pointsData.value = userPoints;

    if (
      userPoints > 0 &&
      levelUpPoints > 0 &&
      levelUpPoints !== pointsRequiredForCurrentLevel
    ) {
      pointsData = {
        shouldDisplayProgressBar: true,
        value:
          (userPoints - pointsRequiredForCurrentLevel) /
          (levelUpPoints - pointsRequiredForCurrentLevel),
      };
    }

    return pointsData;
  }

  @action handleLeaveTeam = async () => {
    if (this.userIsTeamMember) {
      await Api.teamLeave(this.userTeamStore.teamName);
      this.loadUserProfile();
    }
  };

  @action handleJoinTeam = async (teamName: string, teamAccessCode: string) => {
    await Api.teamJoin(teamName, teamAccessCode);
    this.loadUserProfile();
  };

  @action handleCreateTeam = async (teamName: string) => {
    await Api.teamCreate(teamName);
    this.loadUserProfile();
  };
}

const userProfileStore = new UserProfileStore();

export default userProfileStore;
