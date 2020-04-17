import Content from 'components/Content/Content';
import ProfilePageStore, { PageState } from 'utils/store/profilePageStore';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import { AuthStore } from 'utils/store/authStore';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { UiStore } from 'utils/store/uiStore';
import BadgesList from 'components/BadgesList/BadgesList';
import CardsList from 'components/CardsList/CardsList';
import ItemModal from 'components/ItemModal/ItemModal';
import { UserPoints } from 'components/UserPoints/UserPoints';
import UserAvatar from 'components/Avatar/Avatar';
import { UserAvatarType } from 'components/Avatar/Avatar.style';
import {
  StyledLink,
  Subtitle,
  Title,
  CenteredButtonLink,
} from 'components/Page/Page.style';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Trans, withTranslation, WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
  authStore: AuthStore;
  userProfileStore: UserProfileStore;
}

@inject('uiStore', 'authStore', 'userProfileStore')
@observer
class ProfilePage extends React.Component<Props> {
  uiStore = this.props.uiStore;
  authStore = this.props.authStore;
  userProfileStore = this.props.userProfileStore;

  profilePageStore = new ProfilePageStore(this.props.i18n, true);

  async componentDidMount(): Promise<void> {
    this.profilePageStore.setTReady(this.props.tReady);

    await this.profilePageStore.loadData();
    await this.userProfileStore.loadUserProfile();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.profilePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.profilePageStore.unmount();
  }

  logout = () => {
    this.authStore.signOut();
    this.props.history.push('/');
  };

  render() {
    if (!this.props.tReady || this.profilePageStore.state !== PageState.LOADED)
      return null;

    if (
      this.uiStore.languages.length > 0 &&
      this.uiStore.isUserLocaleMatch === false
    ) {
      this.uiStore.setLanguage(this.uiStore.languages[0].key);
    }

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'User profile')}</title>
        </Helmet>
        <Content>
          <UserAvatar type={UserAvatarType.PROFILE} />

          <Title>{this.userProfileStore.userName}</Title>

          {this.userProfileStore.userIsTeamMember && (
            <Subtitle>
              <Trans i18nKey="teamMembership" ns="profile-page">
                You are in group:
                <StyledLink to="/team">
                  {{ teamName: this.userProfileStore.userTeamStore.teamName }}
                </StyledLink>
              </Trans>
            </Subtitle>
          )}

          <UserPoints
            points={this.userProfileStore.points}
            nextLevelStart={this.userProfileStore.nextLevelPoint}
          />

          <BadgesList badges={this.userProfileStore.userBadges} />

          <CardsList cards={this.userProfileStore.userCards} />

          <LanguageSwitch
            uiLanguages={this.uiStore.languages}
            userLanguage={this.uiStore.language}
          />

          <CenteredButtonLink onClick={this.logout}>
            {this.props.t('button.logout.label', 'Logout')}
          </CenteredButtonLink>

          <ItemModal />
        </Content>
      </>
    );
  }
}

export default withTranslation('profile-page')(ProfilePage);
