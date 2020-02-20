import Content from 'components/Content/Content';
import TeamPageStore from 'utils/store/teamPageStore';
import { TeamJoinForm } from 'components/TeamJoin/TeamJoin';
import { TeamCreateForm } from 'components/TeamCreate/TeamCreate';
import { AppButton } from 'components/Buttons/AppButton.style';
import { ClipboardButton } from 'components/Buttons/ClipboardButton.style';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { Title, CenteredButtonLink } from 'components/Page/Page.style';
import Label from 'components/Form/Label/Label.style';
import { InputContainer } from 'components/Form/Form.style';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Tooltip from 'rc-tooltip';

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

  copyToClipboard = () => {
    navigator.clipboard.writeText(
      this.userProfileStore.userTeamStore.teamAccessCode.toString(),
    );
  };

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
              <Title>{this.userProfileStore.userTeamStore.teamName}</Title>
              <InputContainer>
                <Label>
                  {this.props.t(
                    'form.teamAccessCode.teamAccessCode',
                    'Team access code',
                  )}
                </Label>
                <Tooltip
                  overlay={this.props.t(
                    'form.teamAccessCode.copied',
                    'Copied!',
                  )}
                  overlayClassName="badge-tooltip"
                  placement="top"
                  trigger="click"
                >
                  <ClipboardButton onClick={this.copyToClipboard}>
                    <span>
                      {this.userProfileStore.userTeamStore.teamAccessCode}
                    </span>
                    <span>
                      {this.props.t('form.teamAccessCode.copy', 'copy')}
                    </span>
                  </ClipboardButton>
                </Tooltip>
              </InputContainer>

              <AppButton as={Link} to="/area" isThin={true}>
                {this.props.t('footerLink.continue', 'Continue')}
              </AppButton>
              <CenteredButtonLink
                onClick={() => this.userProfileStore.handleLeaveTeam()}
              >
                {this.props.t('button.leaveTeam', 'Leave team')}
              </CenteredButtonLink>
            </>
          ) : (
            <>
              <TeamJoinForm onSubmit={this.userProfileStore.handleJoinTeam} />
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
