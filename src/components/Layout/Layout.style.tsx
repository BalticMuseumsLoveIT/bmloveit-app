import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* { box-sizing: border-box }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background: ${props => props.theme.colors.background.app};
  }
`;

export const LayoutGrid = styled.div`
  width: 100%;
  max-width: 45em;
  min-height: 100%;
  margin: auto;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
`;

export const LayoutGridCookie = styled.div`
  grid-row: 1 / span 1;
`;

export const LayoutGridHeader = styled.div`
  grid-row: 2 / span 1;
`;

export const LayoutGridContent = styled.div`
  grid-row: 3 / span 1;
`;

export const LayoutGridFooter = styled.div`
  grid-row: 4 / span 1;
`;
