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

interface HeaderProps extends RouteComponentProps {
  className?: string;
}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <LayoutGridHeader className={this.props.className}>
        <AppHeader>
          <BackButtonCell>
            <BackButton onClick={this.props.history.goBack}>
              <BackButtonIcon src="/images/arrow_back-24px.svg" />
            </BackButton>
          </BackButtonCell>
          <MuseumLogoCell>
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
