import { MainMenuPatchedInterface } from 'utils/interfaces';
import { StaticLinkInterface } from 'components/MainMenu/Links';
import { action, computed, observable } from 'mobx';
import React from 'react';
import { TFunction } from 'i18next';

export enum MainMenuState {
  OPENED,
  CLOSED,
}

export default class MainMenuStore {
  private _defaultMenu: Array<MainMenuPatchedInterface> = [];

  private _searchTree = (
    tree: Array<MainMenuPatchedInterface>,
    compare: (node: MainMenuPatchedInterface) => boolean,
  ) => {
    const innerTree = [...tree];

    let node: MainMenuPatchedInterface;

    while (innerTree.length > 0) {
      node = innerTree.pop() as MainMenuPatchedInterface;

      if (compare(node)) {
        return node;
      } else {
        if (node.child_menus_data.length > 0) {
          node.child_menus_data.forEach(child => innerTree.push(child));
        }
      }
    }

    return null;
  };

  private _getSubmenu = (
    items: Array<MainMenuPatchedInterface>,
    id: number,
  ): Array<MainMenuPatchedInterface> => {
    const item = this._searchTree(items, node => node.id === id);

    return (item && item.child_menus_data) || [];
  };

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

  @observable menu: Array<MainMenuPatchedInterface> = [];

  @observable ancestors: Array<number> = [];

  @action initMenu = (menu: Array<MainMenuPatchedInterface>) => {
    const success = this.setMenu(menu);

    if (success) {
      this._defaultMenu = menu;

      this.clearAncestors();
      this.pushAncestor(-1);
    }
  };

  @action setMenu = (menu: Array<MainMenuPatchedInterface>): boolean => {
    if (menu.length > 0) {
      this.menu = menu;
      return true;
    } else {
      return false;
    }
  };

  @action loadMenu = (id: number): boolean => {
    if (Number.isNaN(id)) return false;

    const menuItems: Array<MainMenuPatchedInterface> =
      id >= 0 ? this._getSubmenu(this._defaultMenu, id) : this._defaultMenu;

    return menuItems.length > 0 ? this.setMenu(menuItems) : false;
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
  @action openSubMenu = (e: React.SyntheticEvent, id: number) => {
    const isMenuLoaded = this.loadMenu(id);
    if (isMenuLoaded) this.pushAncestor(id);
  };

  /**
   * Open parent menu
   */
  @action openParentMenu = () => {
    if (!this.isSubmenu) return;

    const isMenuLoaded = this.loadMenu(this.parentId);
    if (isMenuLoaded) this.popAncestor();
  };

  @computed get parentId(): number {
    return this.ancestors.length > 1
      ? this.ancestors[this.ancestors.length - 2]
      : NaN;
  }

  @computed get items(): Array<MainMenuPatchedInterface> {
    return this.menu;
  }

  @computed get isSubmenu(): boolean {
    return this.ancestors.length > 1;
  }

  @computed get isOpened(): boolean {
    return this.state === MainMenuState.OPENED;
  }
}
