import { UiStore } from 'utils/store/uiStore';
import Api from 'utils/api';
import { ItemInterface, ItemKind, ItemTag, ItemType } from 'utils/interfaces';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { action, computed, observable } from 'mobx';
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

  // Store ---------------------------------------------------------------------

  @observable menu: ItemInterface | null = null;

  @observable root: Array<number> = [];

  @action setMenu = (menu: ItemInterface): boolean => {
    if (
      menu.kind_data &&
      menu.kind_data.name === ItemKind.MENU &&
      menu.type_data &&
      menu.type_data.name === ItemType.DEFAULT
    ) {
      this.menu = menu;
      return true;
    } else {
      return false;
    }
  };

  @action loadMenu = async (id: number): Promise<boolean> => {
    try {
      const menuItems = await Api.getItem({
        id: id,
        kind__name: ItemKind.MENU,
        type__name: ItemType.DEFAULT,
      });

      return menuItems.length > 0 ? this.setMenu(menuItems[0]) : false;
    } catch (e) {
      return false;
    }
  };

  @action rootPush = (id: number) => {
    this.root.push(id);
  };

  @action rootPop = (): number => {
    return this.root.length > 1 ? this.root.pop()! : -1;
  };

  @computed get parent(): number {
    return this.root.length > 1 ? this.root[this.root.length - 2] : -1;
  }

  @computed get items(): Array<ItemInterface> {
    return (
      (this.menu &&
        this.menu.child_items_data.filter((item: ItemInterface) => {
          return item.kind_data && item.kind_data.name === ItemKind.MENU;
        })) ||
      []
    );
  }

  // Methods -------------------------------------------------------------------

  handleMenuChangeIn = async (e: React.SyntheticEvent, id: number) => {
    (await this.loadMenu(id)) && this.rootPush(this.menu!.id);
  };

  handleMenuChangeOut = async () => {
    if (this.root.length > 1)
      (await this.loadMenu(this.parent)) && this.rootPop();
  };

  componentDidMount = async () => {
    const menuItems = await Api.getItem({
      kind__name: ItemKind.MENU,
      item_tags__tag__name: ItemTag.MAIN,
    });

    if (menuItems.length > 0)
      this.setMenu(menuItems[0]) && this.rootPush(this.menu!.id);
  };

  // Subcomponents -------------------------------------------------------------

  MenuLogo = () => {
    return <StyledLogo src="/images/logo-eu.png" alt="" />;
  };

  MenuLinks = observer(() => {
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
  });

  MenuItem = observer(({ item }: { item: ItemInterface }) => {
    const { toggleIsMenuOpened: closeMenu } = this.props.uiStore!;

    switch (item.type_data.name) {
      case ItemType.DEFAULT:
        return (
          <button onClick={e => this.handleMenuChangeIn(e, item.id)}>
            {item.name_full}
          </button>
        );
      case ItemType.LINK:
        return (
          <Link to={item.description} onClick={closeMenu}>
            {item.name_full}
          </Link>
        );
      default:
        return null;
    }
  });

  MenuItems = observer(() => {
    const { MenuItem } = this;

    return this.items.length > 0 ? (
      <ul>
        {this.root.length > 1 && (
          <li>
            <button onClick={this.handleMenuChangeOut}>Back</button>
          </li>
        )}
        {this.items.map((item: ItemInterface) => (
          <li key={item.id}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    ) : null;
  });

  // Render --------------------------------------------------------------------

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
