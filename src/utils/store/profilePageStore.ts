import {
  CommonLanguageInterface,
  ItemInterface,
  ResourceTypeName,
  UserProfileInterface,
} from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { action, autorun, computed, observable, when } from 'mobx';
import ISO6391 from 'iso-639-1';
import { i18n } from 'i18next';
import { FormikValues } from 'formik';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class ProfilePageStore {
  private _i18n: i18n;
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable userProfileData: UserProfileInterface | null = null;
  @observable languageList: Array<CommonLanguageInterface> = [];
  @observable tReady?: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case PageState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case PageState.NOT_LOADED:
      case PageState.LOADED:
      case PageState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  constructor(i18n: i18n, manageContentState = false) {
    this._i18n = i18n;
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @computed get userAvatar(): ItemInterface | null {
    return this.userProfileData !== null ? this.userProfileData.avatar : null;
  }

  @computed get userAvatarImageURL(): string {
    if (!this.userAvatar || !this.userAvatar.resources_data.length) return '';

    const resource = this.userAvatar.resources_data.find(
      resource => resource.type_name === ResourceTypeName.Image,
    );

    return resource ? resource.file_url : '';
  }

  @computed get userName(): string {
    if (this.userProfileData === null) return '';

    const profile = this.userProfileData;

    if (profile.first_name.length && profile.last_name.length)
      return `${profile.first_name} ${profile.last_name}`;

    return profile.username;
  }

  @computed get pointsData(): Array<number> {
    if (this.userProfileData === null) return [];

    const maxPoints =
      this.userProfileData.level_up_points !== null
        ? this.userProfileData.level_up_points
        : 0;

    return [this.userProfileData.points, maxPoints];
  }

  @computed get cards(): Array<any> {
    if (this.userProfileData === null) return [];

    const cards = this.userProfileData.owned_items_data.filter(item => {
      return item.item_data.type_data.name === 'card';
    });

    return cards;
  }

  @action setLanguageList = (
    languageListData: Array<CommonLanguageInterface>,
  ) => {
    this.languageList = languageListData.filter(language =>
      ISO6391.validate(language.key),
    );
  };

  @action handleSubmit = async (values: FormikValues): Promise<void> => {
    await this._i18n.changeLanguage(values.language);
  };

  @action loadData = async () => {
    try {
      this.setState(PageState.LOADING);

      const [userProfileData, languageListData] = await Promise.all([
        Api.getUserProfile(),
        Api.getLanguageList(),
        when(() => this.tReady === true),
      ]);

      this.setUserProfile(userProfileData);
      this.setLanguageList(languageListData);
      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action setUserProfile(userProfileData: UserProfileInterface) {
    this.userProfileData = userProfileData;
  }

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
