import { UiStore } from 'utils/store/uiStore';
import Api from 'utils/api';
import {
  MainMenuContent,
  MainMenuFooter,
} from 'components/MainMenu/MainMenu.style';
import { LayoutMainMenu } from 'components/Layout/Layout.style';
import { SponsorLogotype } from 'components/SponsorLogotype/SponsorLogotype';
import { StaticLinks } from 'components/MainMenu/Links';
import { Items } from 'components/MainMenu/Items';
import { patch } from 'utils/helpers';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {}

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
    const menuItems = await Api.getAppMenu();

    if (menuItems.length > 0) {
      this.ui.nav.initMenu(patch({ items: menuItems, id: 0 }).items);
    }
  };

  render() {
    return (
      <LayoutMainMenu>
        <MainMenuContent>
          <Items
            items={this.ui.nav.items}
            ancestors={this.ui.nav.ancestors}
            closeMenu={this.ui.nav.close}
            openParentMenu={this.ui.nav.openParentMenu}
            openSubMenu={this.ui.nav.openSubMenu}
          />
          {!this.ui.nav.isSubmenu && (
            <StaticLinks
              links={this.ui.nav.links}
              closeMenu={this.ui.nav.close}
            />
          )}
        </MainMenuContent>
        <MainMenuFooter>
          <SponsorLogotype />
        </MainMenuFooter>
      </LayoutMainMenu>
    );
  }
}

export default withRouter(MainMenu);
