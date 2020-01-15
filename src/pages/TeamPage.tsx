import Content from 'components/Content/Content';
import TeamPageStore from 'utils/store/teamPageStore';
import { TeamJoinForm } from 'components/TeamJoin/TeamJoin';
import { TeamCreateForm } from 'components/TeamCreate/TeamCreate';
import Footer from 'components/Footer/Footer';
import { FooterLink } from 'components/Footer/Footer.style';
import { TeamLeave } from 'components/TeamLeave/TeamLeave';
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
          {this.groupPageStore.isTeamMember ? (
            <>
              <h2>{this.props.t('content.title.teamDetails', 'Your Team')}</h2>
              <h3>{this.props.t('content.subtitle.teamName', 'Team name')}</h3>
              <p>{this.groupPageStore.teamName}</p>
              <h3>
                {this.props.t(
                  'content.subtitle.teamAccessCode',
                  'Team access code',
                )}
              </h3>
              <p>{this.groupPageStore.teamAccessCode}</p>
              <Footer>
                <FooterLink
                  as={TeamLeave}
                  onClick={() => this.groupPageStore.handleLeaveTeam()}
                >
                  Leave
                </FooterLink>
                <FooterLink to={`/area`}>
                  {this.props.t('footerLink.continue', 'Continue')}
                </FooterLink>
              </Footer>
            </>
          ) : (
            <>
              <h2>{this.props.t('content.title.joinTeam', 'Join team')}</h2>
              <TeamJoinForm onSubmit={this.groupPageStore.handleJoinTeam} />

              <h2>{this.props.t('content.title.createTeam', 'Create team')}</h2>
              <TeamCreateForm onSubmit={this.groupPageStore.handleCreateTeam} />
            </>
          )}
        </Content>
      </>
    );
  }
}

export default withTranslation('team-page')(TeamPage);
