import styled, { css } from 'styled-components';

export interface MuseumLogoImageProps {
  maxWidth?: string;
  isElevated?: boolean;
}

const MuseumLogoImage = styled.img<MuseumLogoImageProps>`
  font-size: 1em;
  display: block;
  width: 100%;
  height: 100%;
  max-width: ${props => props.maxWidth};
  border-radius: 50%;
  margin: 0.5em;
  ${props =>
    props.isElevated &&
    css`
      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
    `};
`;

export default MuseumLogoImage;
