import { Switch as MainMenuToggleSwitch } from 'components/MainMenu/Switch';
import MainMenu from 'components/MainMenu/MainMenu';
import MuseumLogo from 'components/MuseumLogo/MuseumLogo';
import UserAvatar from 'components/Avatar/Avatar';
import { UserAvatarType } from 'components/Avatar/Avatar.style';
import { LayoutGridHeader } from 'components/Layout/Layout.style';
import { MuseumLogoImageType } from 'components/MuseumLogo/MuseumLogo.style';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import React from 'react';
import AppHeader, {
  BackButton,
  BackButtonCell,
  MuseumLogoCell,
  ToggleSwitchCell,
  UserAvatarCell,
} from './Header.style';

interface HeaderProps extends RouteComponentProps {
  isVisible?: boolean;
}

class Header extends React.Component<HeaderProps> {
  render() {
    if (!this.props.isVisible) return null;

    return (
      <LayoutGridHeader>
        <AppHeader>
          <BackButtonCell>
            <BackButton onClick={this.props.history.goBack}>&larr;</BackButton>
          </BackButtonCell>
          <MuseumLogoCell>
            <MuseumLogo type={MuseumLogoImageType.HEADER} />
          </MuseumLogoCell>
          <UserAvatarCell>
            <UserAvatar type={UserAvatarType.HEADER} />
          </UserAvatarCell>
          <ToggleSwitchCell>
            <MainMenuToggleSwitch />
          </ToggleSwitchCell>
        </AppHeader>
        <MainMenu />
      </LayoutGridHeader>
    );
  }
}

export default withRouter(Header);
