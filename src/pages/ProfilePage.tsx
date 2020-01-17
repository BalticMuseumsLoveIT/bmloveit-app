import Content from 'components/Content/Content';
import ProfilePageStore from 'utils/store/profilePageStore';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import { getPrivateMediaURL, toISO6391 } from 'utils/helpers';
import { UserStore } from 'utils/store/userStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends WithTranslation, RouteComponentProps {
  userStore: UserStore;
}

@inject('userStore')
@observer
class ProfilePage extends React.Component<Props> {
  userStore = this.props.userStore;
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
    this.userStore.signOut();
    this.props.history.push('/');
  };

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'User profile')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'User Profile')}</h1>
          <p>{this.profilePageStore.userName}</p>
          {this.profilePageStore.userAvatar && (
            <img
              src={getPrivateMediaURL(this.profilePageStore.userAvatarImageURL)}
              alt={this.profilePageStore.userAvatar.name_full}
            />
          )}
          <LanguageSwitch
            list={this.profilePageStore.languageList}
            userLocale={toISO6391(this.props.i18n.language)}
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
