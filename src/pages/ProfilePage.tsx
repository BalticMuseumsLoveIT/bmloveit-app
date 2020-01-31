import Content from 'components/Content/Content';
import ProfilePageStore, { PageState } from 'utils/store/profilePageStore';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import { getPrivateMediaURL } from 'utils/helpers';
import { AuthStore } from 'utils/store/authStore';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { UiStore } from 'utils/store/uiStore';
import BadgesList from 'components/BadgesList/BadgesList';
import CardsList from 'components/CardsList/CardsList';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
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

    const {
      shouldDisplayProgressBar,
      value: pointsValue,
    } = this.profilePageStore.pointsData;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'User profile')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'User Profile')}</h1>
          <p>{this.userProfileStore.userName}</p>
          {this.profilePageStore.team && (
            <h2>You are in group: {this.profilePageStore.team.name}</h2>
          )}
          {pointsValue > 0 &&
            (shouldDisplayProgressBar === false ? (
              <p>Punkty: {pointsValue}</p>
            ) : (
              <p>Progress: {pointsValue}</p>
            ))}
          {this.userProfileStore.userHasAvatar && (
            <img
              src={getPrivateMediaURL(this.userProfileStore.userAvatarURL)}
              alt={this.userProfileStore.userAvatarName}
            />
          )}
          {this.profilePageStore.userProfileData!.badges_data.length > 0 && (
            <BadgesList
              badges={this.profilePageStore.userProfileData!.badges_data}
            />
          )}
          {this.profilePageStore.cards.length > 0 && (
            <CardsList cards={this.profilePageStore.cards} />
          )}
          <LanguageSwitch
            uiLanguages={this.uiStore.languages}
            userLanguage={this.uiStore.language}
            onSubmit={this.profilePageStore.handleSubmit}
          />
          <p>
            <button onClick={this.logout}>
              {this.props.t('button.logout.label', 'Logout')}
            </button>
          </p>
        </Content>
      </>
    );
  }
}

export default withTranslation('profile-page')(ProfilePage);
