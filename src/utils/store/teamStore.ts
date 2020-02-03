import Api from 'utils/api';
import { isAPIError, TeamInterface } from 'utils/interfaces';
import { action, computed, observable } from 'mobx';

export default class TeamStore {
  @observable teamData!: TeamInterface | null;

  constructor(teamData: TeamInterface | null = null) {
    this.setTeamData(teamData);
  }

  @action setTeamData = (teamData: TeamInterface | null) => {
    this.teamData = teamData;
  };

  @action loadTeamData = async (teamId: number) => {
    const teamDataResponse = await Api.getTeam(teamId);
    this.setTeamData(isAPIError(teamDataResponse) ? null : teamDataResponse);
  };

  @computed get isTeamLoaded(): boolean {
    return this.teamData !== null;
  }

  @computed get teamId(): number {
    return this.teamData ? this.teamData.id : NaN;
  }

  @computed get teamName(): string {
    return this.teamData ? this.teamData.name : '';
  }

  @computed get teamAccessCode(): number {
    return this.teamData ? this.teamData.access_code : NaN;
  }
}
