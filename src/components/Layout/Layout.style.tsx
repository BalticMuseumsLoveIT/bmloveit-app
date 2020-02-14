import { DefaultGridPadding } from 'components/Page/Page.style';
import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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

export interface LayoutGridContentProps {
  backgroundImage?: string;
  backgroundColor?: string;
}

export const LayoutGridContent = styled.div<LayoutGridContentProps>`
  grid-row: 3 / span 1;
  ${DefaultGridPadding}

  ${props =>
    props.backgroundImage &&
    css`
      background: transparent url(${props.backgroundImage}) 50% 50% no-repeat;
      background-size: cover;
    `}
  
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}
`;

export const LayoutGridFooter = styled.div`
  grid-row: 4 / span 1;
`;
