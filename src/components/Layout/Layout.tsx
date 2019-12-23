import theme from 'utils/theme';
import Header from 'components/Header/Header';
import { CookieBar } from 'components/CookieBar/CookieBar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import StyledWrapper, { GlobalStyle } from './Layout.style';

export interface Props {
  children?: React.ReactNode;
}

export default class Layout extends React.Component<Props> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <StyledWrapper>
            <CookieBar />
            <Header />
            {this.props.children}
          </StyledWrapper>
        </>
      </ThemeProvider>
    );
  }
}
