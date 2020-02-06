import { Switch as MainMenuToggleSwitch } from 'components/MainMenu/Switch';
import MainMenu from 'components/MainMenu/MainMenu';
import MuseumLogo from 'components/MuseumLogo/MuseumLogo';
import UserAvatar from 'components/Header/UserAvatar';
import { LayoutGridHeader } from 'components/Layout/Layout.style';
import { MuseumLogoImageType } from 'components/MuseumLogo/MuseumLogo.style';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import React from 'react';
import AppHeader, { BackButton, MuseumLogoWrapper } from './Header.style';

interface HeaderProps extends RouteComponentProps {
  isVisible?: boolean;
}

class Header extends React.Component<HeaderProps> {
  render() {
    if (!this.props.isVisible) return null;

    return (
      <LayoutGridHeader>
        <AppHeader>
          <BackButton onClick={this.props.history.goBack}>&larr;</BackButton>
          <MuseumLogoWrapper>
            <MuseumLogo type={MuseumLogoImageType.HEADER} />
          </MuseumLogoWrapper>
          <UserAvatar />
          <MainMenuToggleSwitch />
        </AppHeader>
        <MainMenu />
      </LayoutGridHeader>
    );
  }
}

export default withRouter(Header);
