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
      // Define label as function and run it inside render to allow extraction
      // plugin to read those strings
      label: () => this.props.t('mainMenu.home', 'Home'),
    },
    {
      to: '/quiz',
      label: () => this.props.t('mainMenu.quiz', 'Quiz'),
    },
    {
      to: '/survey',
      label: () => this.props.t('mainMenu.survey', 'Survey'),
    },
    {
      to: '/routes',
      label: () => this.props.t('mainMenu.routes', 'Available Routes'),
    },
    {
      to: '/qrcode',
      label: () => this.props.t('mainMenu.qr', 'QR Code'),
    },
    {
      to: '/login',
      label: () => this.props.t('mainMenu.login', 'Login'),
    },
    {
      to: '/profile',
      label: () => this.props.t('mainMenu.profile', 'Profile'),
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
          {item.label()}
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
