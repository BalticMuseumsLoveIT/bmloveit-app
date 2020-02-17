import { ItemInterface, ItemKind, ItemType } from 'utils/interfaces';
import Api from 'utils/api';
import { StaticLinkInterface } from 'components/MainMenu/Links';
import { action, computed, observable } from 'mobx';
import React from 'react';
import { TFunction } from 'i18next';

export enum MainMenuState {
  OPENED,
  CLOSED,
}

export default class MainMenuStore {
  private _defaultMenu: ItemInterface | null = null;

  @observable links: Array<StaticLinkInterface> = [
    {
      to: '/welcome',
      label: (t: TFunction) => t('mainMenu.home', 'Homepage'),
    },
    {
      to: '/about',
      label: (t: TFunction) => t('mainMenu.about', 'About application'),
    },
  ];

  @observable state: MainMenuState = MainMenuState.CLOSED;

  @observable menu: ItemInterface | null = null;

  @observable ancestors: Array<number> = [];

  @action initMenu = (menu: ItemInterface) => {
    const success = this.setMenu(menu);

    if (success) {
      this._defaultMenu = menu;

      this.clearAncestors();
      this.pushAncestor(menu.id);
    }
  };

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
    const menuItems = await Api.getItem({
      id: id,
      kind__name: ItemKind.MENU,
      type__name: ItemType.DEFAULT,
    });

    return menuItems.length > 0 ? this.setMenu(menuItems[0]) : false;
  };

  @action setState = (state: MainMenuState) => {
    this.state = state;
  };

  @action close = () => {
    this.setState(MainMenuState.CLOSED);

    if (this.isSubmenu && this._defaultMenu !== null) {
      this.initMenu(this._defaultMenu);
    }
  };

  @action open = () => {
    this.setState(MainMenuState.OPENED);
  };

  @action toggle = () => {
    this.state === MainMenuState.OPENED ? this.close() : this.open();
  };

  @action clearAncestors = () => {
    this.ancestors = [];
  };

  @action pushAncestor = (id: number) => {
    this.ancestors.push(id);
  };

  @action popAncestor = (): number => {
    return this.ancestors.length > 1 ? this.ancestors.pop()! : -1;
  };

  /**
   * Open sub menu
   *
   * @param { React.SyntheticEvent } e - Event
   * @param { number } id - Id of a sub menu
   */
  @action openSubMenu = async (e: React.SyntheticEvent, id: number) => {
    const isMenuLoaded = await this.loadMenu(id);
    if (isMenuLoaded) this.pushAncestor(this.menu!.id);
  };

  /**
   * Open parent menu
   */
  @action openParentMenu = async () => {
    if (!this.isSubmenu) return;

    const isMenuLoaded = await this.loadMenu(this.parentId);
    if (isMenuLoaded) this.popAncestor();
  };

  @computed get parentId(): number {
    return this.ancestors.length > 1
      ? this.ancestors[this.ancestors.length - 2]
      : -1;
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

  @computed get isSubmenu(): boolean {
    return this.ancestors.length > 1;
  }

  @computed get isOpened(): boolean {
    return this.state === MainMenuState.OPENED;
  }
}
