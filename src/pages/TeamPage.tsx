import Content from 'components/Content/Content';
import TeamPageStore from 'utils/store/teamPageStore';
import { TeamJoinForm } from 'components/TeamJoin/TeamJoin';
import { TeamCreateForm } from 'components/TeamCreate/TeamCreate';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation {}

@observer
class TeamPage extends React.Component<Props> {
  groupPageStore = new TeamPageStore(true);

  async componentDidMount(): Promise<void> {
    this.groupPageStore.setTReady(this.props.tReady);
    await this.groupPageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.groupPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.groupPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Team')}</title>
        </Helmet>
        <Content>
          <h2>{this.props.t('content.title.teamList', 'Team list')}</h2>
          {this.groupPageStore.teamListData.map(team => (
            <p key={team.id}>
              {team.name} {team.access_code}
            </p>
          ))}
          <h2>{this.props.t('content.title.joinTeam', 'Join team')}</h2>
          <TeamJoinForm onSubmit={this.groupPageStore.handleJoinTeam} />
          <h2>{this.props.t('content.title.createTeam', 'Create team')}</h2>
          <TeamCreateForm onSubmit={this.groupPageStore.handleCreateTeam} />
        </Content>
      </>
    );
  }
}

export default withTranslation('team-page')(TeamPage);
