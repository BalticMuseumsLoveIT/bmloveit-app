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
    const theme = this.siteStore.theme;
    theme.isMenuOpened = this.uiStore.nav.isOpened;
    return theme;
  };

  render() {
    const { displayHeader, children } = this.props;

    return (
      <ThemeProvider theme={() => this.theme()}>
        <GlobalStyle />
        <LayoutGrid>
          <CookieBar />
          {displayHeader && <Header />}
          {displayHeader && <MainMenu />}
          {children}
        </LayoutGrid>
      </ThemeProvider>
    );
  }
}
