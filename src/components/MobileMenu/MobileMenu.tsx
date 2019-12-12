import MenuItem from 'components/MenuItem/MenuItem';
import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import { inject, observer } from 'mobx-react';
import StyledWrapper from './MobileMenu.style';

interface Props {
  uiStore?: UiStore;
}

const links = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/quiz',
    title: 'Quiz',
  },
  {
    to: '/routes',
    title: 'Available Routes',
  },
  {
    to: '/login',
    title: 'Login',
  },
];

@inject('uiStore')
@observer
class MobileMenu extends React.Component<Props> {
  render() {
    const menuItems = links.map((item, index) => {
      return (
        <MenuItem
          key={index}
          to={item.to}
          onClick={() => this.props.uiStore!.toggleIsMenuOpened()}
        >
          {item.title}
        </MenuItem>
      );
    });

    return (
      <StyledWrapper isOpened={this.props.uiStore!.isMenuOpened}>
        {menuItems}
      </StyledWrapper>
    );
  }
}

export default MobileMenu;
