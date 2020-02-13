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
  padding: 0;
  width: ${props => 10 * props.widthSF}%;
  height: ${props => 10 * props.heightSF}%;
  transform: translate(-50%, -50%);
  position: absolute;
  left: ${props => (props.x * 100) / props.width}%;
  top: ${props => (props.y * 100) / props.height}%;

  ${({ isCustom }) =>
    isCustom &&
    css`
      background: none;
      border: none;
    `}
`;

export const StyledIcon = styled.img`
  max-width: 100%;
`;
