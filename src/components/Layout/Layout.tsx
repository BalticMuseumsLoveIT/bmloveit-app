import Header from 'components/Header/Header';
import CookieBar from 'components/CookieBar/CookieBar';
import { SiteStore } from 'utils/store/siteStore';
import { UiStore } from 'utils/store/uiStore';
import { GlobalStyle, LayoutGrid } from 'components/Layout/Layout.style';
import MainMenu from 'components/MainMenu/MainMenu';
import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { observer, inject } from 'mobx-react';

interface Props {
  children?: React.ReactNode;
  displayHeader?: boolean;
}

interface InjectedProps extends Props {
  siteStore: SiteStore;
  uiStore: UiStore;
}

@inject('siteStore', 'uiStore')
@observer
export default class Layout extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  siteStore = this.injected.siteStore;
  uiStore = this.injected.uiStore;

  theme = (): DefaultTheme => {
    return Object.assign(this.siteStore.theme, {
      isMenuOpened: this.uiStore.nav.isOpened,
    });
  };

  render() {
    const { displayHeader, children } = this.props;

    return (
      <ThemeProvider theme={() => this.theme()}>
        <GlobalStyle />
        <LayoutGrid isMenuOpened={this.uiStore.nav.isOpened}>
          <CookieBar />
          {displayHeader && <Header />}
          {displayHeader && <MainMenu />}
          {children}
        </LayoutGrid>
      </ThemeProvider>
    );
  }
}
