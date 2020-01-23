// import MenuItem from 'components/MenuItem/MenuItem';
import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import StyledWrapper, {
  LinkItem,
  LinkList,
  StyledLogo,
} from './MobileMenu.style';

interface Props extends WithTranslation {
  uiStore?: UiStore;
}

@inject('uiStore')
@observer
class MobileMenu extends React.Component<Props> {
  private readonly _links = [
    {
      to: '/welcome',
      // Define label as function and run it inside render to allow extraction
      // plugin to read those strings
      label: () => this.props.t('mainMenu.home', 'Homepage'),
    },
    {
      to: '/about',
      label: () => this.props.t('mainMenu.about', 'About application'),
    },
  ];

  MenuLogo = () => {
    return <StyledLogo src="/images/logo-eu.png" alt="" />;
  };

  MenuLinks = () => {
    const { toggleIsMenuOpened: closeMenu } = this.props.uiStore!;

    return this._links.length > 0 ? (
      <LinkList>
        {this._links.map((item, index) => {
          return (
            <LinkItem key={index}>
              <Link to={item.to} onClick={closeMenu}>
                {item.label()}
              </Link>
            </LinkItem>
          );
        })}
      </LinkList>
    ) : null;
  };

  render() {
    if (!this.props.tReady) return null;

    const { MenuLinks, MenuLogo } = this;

    return (
      <StyledWrapper isOpened={this.props.uiStore!.isMenuOpened}>
        <MenuLinks />
        <MenuLogo />
      </StyledWrapper>
    );
  }
}

export default withTranslation('app')(MobileMenu);
