import { DefaultBoxShadow, TitleFontStyle } from 'components/Page/Page.style';
import styled, { css } from 'styled-components';
import { lighten, em } from 'polished';

export const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledImage = styled.img`
  display: block;
  width: 100%;
`;

interface StyledButtonProps {
  x: number;
  y: number;
  width: number;
  height: number;
  widthSF: number;
  heightSF: number;
  isCustom: boolean;
  visited?: boolean;
  scale: number;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: block;

  font-size: 1em;
  line-height: 1;
  padding: 0;
  // width: ${props => 10 * props.widthSF}%;
  // height: ${props => 10 * props.heightSF}%;
  width: ${em(64)};
  height: ${em(64)};
  transform: translate(-50%, -50%) scale(${props => 1 / (props.scale || 1)});
  position: absolute;
  left: ${props => (props.x * 100) / props.width}%;
  top: ${props => (props.y * 100) / props.height}%;
  outline: none;
  cursor: pointer;

  ${({ isCustom, visited }) =>
    isCustom
      ? css`
          background: none;
          border: none;
        `
      : css`
          background-color: ${({ theme }) =>
            visited
              ? lighten(0.1, theme.colors.background.alternative)
              : theme.colors.button.secondary.default.background};

          &:hover {
            background-color: ${({ theme }) =>
              theme.colors.button.secondary.hover.background};
          }

          &:focus {
            background-color: ${({ theme }) =>
              theme.colors.button.secondary.focus.background};
          }

          border-radius: 50%;

          ${DefaultBoxShadow};

          box-sizing: border-box;
          border: 1px solid
            ${({ theme }) => theme.colors.background.alternative};
        `}
`;

export const StyledIcon = styled.img`
  max-width: 100%;
`;

export const StyledNumber = styled.svg`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 40%;
  fill: ${({ theme }) => theme.colors.button.secondary.default.text};
  
  ${StyledButton}:hover & {
    fill: ${({ theme }) => theme.colors.button.secondary.hover.text};
  }
  
  ${StyledButton}:focus & {
    fill: ${({ theme }) => theme.colors.button.secondary.focus.text};
  }
};

  text {
    text-anchor: middle;
    dominant-baseline: central;
    line-height: 1;
    ${TitleFontStyle}
  }
`;
