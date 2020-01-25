import { UiStore } from 'utils/store/uiStore';
import Api from 'utils/api';
import { ItemKind, ItemTag } from 'utils/interfaces';
import { StaticLinks } from 'components/MainMenu/Links';
import StyledWrapper from 'components/MainMenu/MainMenu.style';
import { Items } from 'components/MainMenu/Items';
import { Logotype } from 'components/MainMenu/Logotype';
import React from 'react';
import { inject, observer } from 'mobx-react';

interface Props {}

interface InjectedProps extends Props {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class MainMenu extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  ui = this.injected.uiStore;

  componentDidMount = async () => {
    const menuItems = await Api.getItem({
      kind__name: ItemKind.MENU,
      item_tags__tag__name: ItemTag.MAIN,
    });

    if (menuItems.length > 0)
      this.ui.nav.setMenu(menuItems[0]) &&
        this.ui.nav.pushAncestor(this.ui.nav.menu!.id);
  };

  render() {
    return (
      <StyledWrapper isOpened={this.ui.nav.isOpened}>
        <Items
          items={this.ui.nav.items}
          ancestors={this.ui.nav.ancestors}
          closeMenu={this.ui.nav.close}
          openParentMenu={this.ui.nav.openParentMenu}
          openSubMenu={this.ui.nav.openSubMenu}
        />
        <StaticLinks links={this.ui.nav.links} closeMenu={this.ui.nav.close} />
        <Logotype />
      </StyledWrapper>
    );
  }
}

export default MainMenu;
