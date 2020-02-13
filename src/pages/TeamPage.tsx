import Content from 'components/Content/Content';
import TeamPageStore from 'utils/store/teamPageStore';
import { TeamJoinForm } from 'components/TeamJoin/TeamJoin';
import { TeamCreateForm } from 'components/TeamCreate/TeamCreate';
import { AppButton } from 'components/Buttons/AppButton.style';
import { UserProfileStore } from 'utils/store/userProfileStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Props extends WithTranslation {
  userProfileStore: UserProfileStore;
}

@inject('userProfileStore')
@observer
class TeamPage extends React.Component<Props> {
  userProfileStore = this.props.userProfileStore;
  groupPageStore = new TeamPageStore(true);

  async componentDidMount() {
    this.groupPageStore.setTReady(this.props.tReady);
    await this.groupPageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.groupPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount() {
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
          {this.userProfileStore.userIsTeamMember ? (
            <>
              <h2>{this.props.t('content.title.teamDetails', 'Your Team')}</h2>
              <h3>{this.props.t('content.subtitle.teamName', 'Team name')}</h3>
              <p>{this.userProfileStore.userTeamStore.teamName}</p>
              <h3>
                {this.props.t(
                  'content.subtitle.teamAccessCode',
                  'Team access code',
                )}
              </h3>
              <p>{this.userProfileStore.userTeamStore.teamAccessCode}</p>
              <AppButton
                onClick={() => this.userProfileStore.handleLeaveTeam()}
              >
                {this.props.t('button.leaveTeam', 'Leave team')}
              </AppButton>
              <AppButton as={Link} to="/area">
                {this.props.t('footerLink.continue', 'Continue')}
              </AppButton>
            </>
          ) : (
            <>
              <h2>{this.props.t('content.title.joinTeam', 'Join team')}</h2>
              <TeamJoinForm onSubmit={this.userProfileStore.handleJoinTeam} />

              <h2>{this.props.t('content.title.createTeam', 'Create team')}</h2>
              <TeamCreateForm
                onSubmit={this.userProfileStore.handleCreateTeam}
              />
            </>
          )}
        </Content>
      </>
    );
  }
}

export default withTranslation('team-page')(TeamPage);
