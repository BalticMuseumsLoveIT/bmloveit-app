import { TeamInterface } from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import { action, autorun, observable, computed, when } from 'mobx';
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
  @observable team: TeamInterface | null = null;
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

  @computed get cards(): Array<any> {
    if (this.userProfileData === null) return [];

    const cards = this.userProfileData.owned_items_data.filter(item => {
      return item.item_data.type_data.name === 'card';
    });

    return cards;
  }

  @action handleSubmit = async (values: FormikValues): Promise<void> => {
    await this._i18n.changeLanguage(values.language);
  };

  @action loadData = async () => {
    try {
      this.setState(PageState.LOADING);

      await Promise.all([when(() => this.tReady === true)]);

      // if (userProfileData.team !== null) {
      //   this.setTeam(await Api.getTeam(userProfileData.team));
      // }

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

  @action setTeam(team: TeamInterface) {
    this.team = team;
  }

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
