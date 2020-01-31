import { TeamInterface, UserProfileInterface } from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { TeamCreateFormValues } from 'components/TeamCreate/TeamCreate';
import { TeamJoinFormValues } from 'components/TeamJoin/TeamJoin';
import i18n from 'i18n';
import { action, autorun, computed, observable, when } from 'mobx';
import { FormikHelpers } from 'formik';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class TeamPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable userProfileData: UserProfileInterface | null = null;
  @observable teamListData: Array<TeamInterface> = [];
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

  constructor(manageContentState = false) {
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @action loadData = async () => {
    try {
      this.setState(PageState.LOADING);

      const [userProfileData, teamListData] = await Promise.all([
        Api.getUserProfile(),
        Api.getTeamList(),
        when(() => this.tReady === true),
      ]);

      this.setUserProfile(userProfileData);
      this.setTeamList(teamListData);
      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @computed get isTeamMember(): boolean {
    return this.teamListData !== null && this.teamListData.length > 0;
  }

  @computed get teamName(): string {
    return this.isTeamMember ? this.teamListData[0].name : '';
  }

  @computed get teamAccessCode(): string {
    return this.isTeamMember ? this.teamListData[0].access_code.toString() : '';
  }

  @computed get teamId(): number {
    return this.isTeamMember ? this.teamListData[0].id : NaN;
  }

  @action setUserProfile(userProfileData: Array<UserProfileInterface>) {
    this.userProfileData = userProfileData.length ? userProfileData[0] : null;
  }

  @action setTeamList(teamListData: Array<TeamInterface>) {
    this.teamListData = teamListData;
  }

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action handleLeaveTeam = async () => {
    try {
      await Api.teamLeave(this.teamName);
      await this.loadData();
    } catch (e) {
      debugger;
    }
  };

  @action handleJoinTeam = async (
    values: TeamJoinFormValues,
    formik: FormikHelpers<TeamJoinFormValues>,
  ) => {
    try {
      await Api.teamJoin(values.teamName, values.teamAccessCode);
      await this.loadData();
    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 404:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.notFound', {
                defaultValue: 'Name "{{teamName}}" was not found',
                teamName: values.teamName,
                ns: 'team-page',
              }),
            );
          case 461:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.invalidCredentials', {
                defaultValue: 'Provided credentials are invalid',
                ns: 'team-page',
              }),
            );
          case 462:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.alreadyMember', {
                defaultValue: 'You are already a member',
                ns: 'team-page',
              }),
            );
          case 464:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.alreadyMemberOfAnotherTeam', {
                defaultValue: 'You are already a member of another team',
                ns: 'team-page',
              }),
            );
        }
      }

      return formik.setStatus(() =>
        i18n.t('teamJoinForm.error.unknownError', {
          defaultValue: 'Team could not be joined due to unknown error',
          ns: 'team-page',
        }),
      );
    }
  };

  @action handleCreateTeam = async (
    values: TeamCreateFormValues,
    formik: FormikHelpers<TeamCreateFormValues>,
  ) => {
    try {
      await Api.teamCreate(values.teamName);
      await this.loadData();
    } catch (e) {
      this.setState(PageState.ERROR);
      if (e.response) {
        switch (e.response.status) {
          case 460:
            return formik.setStatus(() =>
              i18n.t('teamCreateForm.error.notAvailable', {
                defaultValue: 'Name "{{teamName}}" is not available',
                teamName: values.teamName,
                ns: 'team-page',
              }),
            );
          case 464:
            return formik.setStatus(() =>
              i18n.t('teamCreateForm.error.alreadyMember', {
                defaultValue: 'You are already a member of another team',
                ns: 'team-page',
              }),
            );
        }

        return formik.setStatus(() =>
          i18n.t('teamCreateForm.error.unknownError', {
            defaultValue: 'Team could not be created due to unknown error',
            ns: 'team-page',
          }),
        );
      }
    }
  };

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
