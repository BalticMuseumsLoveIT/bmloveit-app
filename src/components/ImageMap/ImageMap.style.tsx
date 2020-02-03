import styled, { css } from 'styled-components';
import React from 'react';

export const StyledWrapper = styled.div`
  position: relative;
`;

export const StyledImage = styled.img`
  display: block;
  width: 100%;
`;

export const StyledButton = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ x, y, width, height, widthSF, heightSF, isCustom, ...rest }) => (
    <button {...rest} />
  ),
)`
  line-height: 0;
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
