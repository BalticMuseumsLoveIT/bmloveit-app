import theme from 'utils/theme';
import Header from 'components/Header/Header';
import CookieBar from 'components/CookieBar/CookieBar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import MainMenu, { GlobalStyle } from './Layout.style';

export interface LayoutProps {
  children?: React.ReactNode;
  displayHeader?: boolean;
}

export default class Layout extends React.Component<LayoutProps> {
  render() {
    const { displayHeader, children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <MainMenu>
            <CookieBar />
            {displayHeader && <Header />}
            {children}
          </MainMenu>
        </>
      </ThemeProvider>
    );
  }
}

export const withLayout = <P extends object>(
  Component: React.ComponentType<P>,
  displayHeader = true,
) =>
  class WithLayout extends React.Component<P> {
    render() {
      return (
        <Layout displayHeader={displayHeader}>
          <Component {...this.props} />
        </Layout>
      );
    }
  };
