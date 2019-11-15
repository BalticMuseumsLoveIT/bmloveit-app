import Hamburger from 'components/Hamburger/Hamburger';
import MobileMenu from 'components/MobileMenu/MobileMenu';
import React from 'react';
import StyledWrapper from './Header.style';

class Header extends React.Component {
  public render() {
    return (
      <StyledWrapper>
        <Hamburger />
        <MobileMenu />
      </StyledWrapper>
    );
  }
}

export default Header;
