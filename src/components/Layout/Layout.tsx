import theme from 'utils/theme';
import Header from 'components/Header/Header';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import StyledWrapper, { GlobalStyle } from './Layout.style';

export interface Props {
  children?: React.ReactNode;
}

export default class Layout extends React.Component<Props> {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <StyledWrapper>
            <Header />
            {this.props.children}
          </StyledWrapper>
        </>
      </ThemeProvider>
    );
  }
}
