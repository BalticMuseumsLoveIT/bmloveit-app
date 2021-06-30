import MainMenuToggleSwitch from 'components/MainMenu/Switch';
import MuseumLogo from 'components/MuseumLogo/MuseumLogo';
import UserAvatar from 'components/Avatar/Avatar';
import { UserAvatarType } from 'components/Avatar/Avatar.style';
import { LayoutGridHeader } from 'components/Layout/Layout.style';
import { LogoType } from 'components/MuseumLogo/MuseumLogo.style';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import React from 'react';
import AppHeader, {
  BackButton,
  BackButtonCell,
  BackButtonIcon,
  MuseumLogoCell,
  ToggleSwitchCell,
  UserAvatarCell,
} from './Header.style';
import { UiStore } from 'utils/store/uiStore';
import { inject, observer } from 'mobx-react';

interface HeaderProps extends RouteComponentProps {
  className?: string;
}

interface InjectedProps extends HeaderProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class Header extends React.Component<HeaderProps> {
  get injected() {
    return this.props as InjectedProps;
  }
  uiStore = this.injected.uiStore;

  render() {
    return (
      <LayoutGridHeader className={this.props.className}>
        <AppHeader>
          <BackButtonCell
            onClick={() => this.injected.uiStore.setShowTextsData(false)}
          >
            <BackButton onClick={this.props.history.goBack}>
              <BackButtonIcon src="/images/arrow_back-24px.svg" />
            </BackButton>
          </BackButtonCell>
          <MuseumLogoCell
            onClick={() => this.injected.uiStore.setShowTextsData(false)}
          >
            <MuseumLogo type={LogoType.HEADER} />
          </MuseumLogoCell>
          <UserAvatarCell>
            <UserAvatar type={UserAvatarType.HEADER} />
          </UserAvatarCell>
          <ToggleSwitchCell>
            <MainMenuToggleSwitch />
          </ToggleSwitchCell>
        </AppHeader>
      </LayoutGridHeader>
    );
  }
}

export default withRouter(Header);
