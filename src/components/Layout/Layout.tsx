import React from 'react';
import { ThemeProvider } from 'styled-components';
import StyledWrapper, { GlobalStyle } from './styles';
import theme from '../../utils/theme';

export interface Props {
  children?: React.ReactNode;
}

export default class Layout extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <StyledWrapper>{this.props.children}</StyledWrapper>
        </>
      </ThemeProvider>
    );
  }
}
