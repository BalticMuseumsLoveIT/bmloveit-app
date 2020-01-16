import theme from 'utils/theme';
import Header from 'components/Header/Header';
import CookieBar from 'components/CookieBar/CookieBar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import StyledWrapper, { GlobalStyle } from './Layout.style';

export interface LayoutProps {
  children?: React.ReactNode;
  header?: boolean;
}

export default class Layout extends React.Component<LayoutProps> {
  render() {
    const { header, children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <StyledWrapper>
            <CookieBar />
            {header && <Header />}
            {children}
          </StyledWrapper>
        </>
      </ThemeProvider>
    );
  }
}

export const withLayout = <P extends object>(
  Component: React.ComponentType<P>,
  header = true,
) =>
  class WithLayout extends React.Component<P> {
    render() {
      return (
        <Layout header={header}>
          <Component {...this.props} />
        </Layout>
      );
    }
  };
