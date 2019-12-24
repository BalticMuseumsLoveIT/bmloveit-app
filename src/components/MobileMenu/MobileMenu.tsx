import MenuItem from 'components/MenuItem/MenuItem';
import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import StyledWrapper from './MobileMenu.style';

interface Props extends WithTranslation {
  uiStore?: UiStore;
}

@inject('uiStore')
@observer
class MobileMenu extends React.Component<Props> {
  private readonly _links = [
    {
      to: '/',
      name: 'home',
      label: 'Home',
    },
    {
      to: '/quiz',
      name: 'quiz',
      label: 'Quiz',
    },
    {
      to: '/survey',
      name: 'survey',
      label: 'Survey',
    },
    {
      to: '/routes',
      name: 'routes',
      label: 'Available Routes',
    },
    {
      to: '/login',
      name: 'login',
      label: 'Login',
    },
  ];

  render() {
    if (!this.props.tReady) return null;

    const menuItems = this._links.map((item, index) => {
      return (
        <MenuItem
          key={index}
          to={item.to}
          onClick={() => this.props.uiStore!.toggleIsMenuOpened()}
        >
          {this.props.t(`mainMenu.${item.name}`, item.label)}
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

export default withTranslation('app')(MobileMenu);
