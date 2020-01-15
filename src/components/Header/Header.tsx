import Hamburger from 'components/Hamburger/Hamburger';
import MobileMenu from 'components/MobileMenu/MobileMenu';
import MuseumLogo from 'components/Header/MuseumLogo';
import UserAvatar from 'components/Header/UserAvatar';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import React from 'react';
import AppHeader, { BackButton } from './Header.style';

interface HeaderProps extends RouteComponentProps<any> {}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <>
        <AppHeader>
          <BackButton onClick={this.props.history.goBack}>&larr;</BackButton>
          <MuseumLogo />
          <UserAvatar />
          <Hamburger />
        </AppHeader>
        <MobileMenu />
      </>
    );
  }
}

export default withRouter(Header);
