import Header from 'components/Header/Header';
import CookieBar from 'components/CookieBar/CookieBar';
import { SiteStore } from 'utils/store/siteStore';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { observer, inject } from 'mobx-react';
import StyledWrapper, { GlobalStyle } from './Layout.style';

interface Props {
  children?: React.ReactNode;
  displayHeader?: boolean;
}

interface InjectedProps extends Props {
  siteStore: SiteStore;
}

@inject('siteStore')
@observer
export default class Layout extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  siteStore = this.injected.siteStore;

  render() {
    const { displayHeader, children } = this.props;

    return (
      <ThemeProvider theme={this.siteStore.theme}>
        <GlobalStyle />
        <StyledWrapper>
          <CookieBar />
          {displayHeader && <Header />}
          {children}
        </StyledWrapper>
      </ThemeProvider>
    );
  }
}
