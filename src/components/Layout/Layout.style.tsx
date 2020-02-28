import {
  DefaultGridPadding,
  ParagraphFontStyle,
  SmallerFontSize,
} from 'components/Page/Page.style';
import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    transition: background-color 100ms linear;
    ${({ theme: { isMenuOpened, colors } }) =>
      isMenuOpened
        ? css`
            background-color: ${colors.background.menu};
          `
        : css`
            background-color: ${colors.background.app};
          `}
  }

  .badge-tooltip {
    opacity: 1 !important;
    font-size: 1em !important;

    .rc-tooltip-arrow {
      border-top-color: ${({ theme }) =>
        theme.colors.background.alternative} !important;
    }

    .rc-tooltip-inner {
      ${SmallerFontSize};
      ${ParagraphFontStyle};
      color: ${({ theme }) => theme.colors.text.alternative};
      background-color: ${({ theme }) => theme.colors.background.alternative};
      min-height: unset;
    }
  }
`;

export const LayoutGridCookie = styled.div`
  grid-row: 1 / span 1;
`;

export const LayoutGridHeader = styled.div`
  grid-row: 2 / span 1;
`;

export const LayoutMainMenu = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;

  grid-row: 3 / span 1;
  ${DefaultGridPadding}
`;

export interface LayoutGridContentProps {
  backgroundImage?: string;
  backgroundColor?: string;
}

export const LayoutGridContent = styled.div<LayoutGridContentProps>`
  grid-row: 4 / span 1;
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

interface LayoutGridFooterProps {
  useDefaultPadding?: boolean;
}

export const LayoutGridFooter = styled.div<LayoutGridFooterProps>`
  grid-row: 5 / span 1;
  ${props =>
    props.useDefaultPadding &&
    css`
      ${DefaultGridPadding}
    `}
`;

export interface LayoutGridProps {
  isMenuOpened?: boolean;
}

export const LayoutGrid = styled.div<LayoutGridProps>`
  width: 100%;
  max-width: 45em;
  min-height: 100%;
  margin: auto;
  display: grid;

  ${({ isMenuOpened }: LayoutGridProps) =>
    isMenuOpened
      ? css`
          grid-template-rows: auto auto 1fr auto auto;

          ${LayoutGridContent}, ${LayoutGridFooter} {
            display: none;
          }
        `
      : css`
          grid-template-rows: auto auto auto 1fr auto;

          ${LayoutMainMenu} {
            display: none;
          }
        `}
`;
