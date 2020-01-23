import { UiStore } from 'utils/store/uiStore';
import Api from 'utils/api';
import { ItemInterface, ItemKind, ItemTag } from 'utils/interfaces';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { observable } from 'mobx';
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
  @observable menu: ItemInterface | null = null;

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

  componentDidMount = async () => {
    const menuItems = await Api.getItem({
      kind__name: ItemKind.MENU,
      item_tags__tag__name: ItemTag.MAIN,
    });

    if (menuItems.length > 0) this.menu = menuItems[0];
  };

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

  MenuItems = () => {
    if (this.menu === null) return null;

    return <p>Main menu items</p>;
  };

  render() {
    if (!this.props.tReady) return null;

    const { MenuItems, MenuLinks, MenuLogo } = this;

    return (
      <StyledWrapper isOpened={this.props.uiStore!.isMenuOpened}>
        <MenuItems />
        <MenuLinks />
        <MenuLogo />
      </StyledWrapper>
    );
  }
}

export default withTranslation('app')(MobileMenu);
