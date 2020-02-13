import { TitleFontStyle } from 'components/Page/Page.style';
import styled, { css } from 'styled-components';

export const StyledWrapper = styled.div`
  position: relative;
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
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: block;
  font-size: 1em;
  line-height: 1;
  padding: 0;
  width: ${props => 10 * props.widthSF}%;
  height: ${props => 10 * props.heightSF}%;
  transform: translate(-50%, -50%);
  position: absolute;
  left: ${props => (props.x * 100) / props.width}%;
  top: ${props => (props.y * 100) / props.height}%;
  outline: none;
  cursor: pointer;

  ${({ isCustom }) =>
    isCustom
      ? css`
          background: none;
          border: none;
        `
      : css`
          background-color: white;
          border-radius: 50%;
          box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.2);
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
  fill: ${({ theme }) => theme.colors.text.paragraph};
};

  text {
    text-anchor: middle;
    dominant-baseline: central;
    line-height: 1;
    ${TitleFontStyle}
  }
`;
