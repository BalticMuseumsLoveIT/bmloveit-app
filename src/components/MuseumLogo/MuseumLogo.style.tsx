import styled, { css } from 'styled-components';

export enum MuseumLogoImageType {
  WELCOME,
  HEADER,
}
export interface MuseumLogoImageProps {
  type?: MuseumLogoImageType;
}

const MuseumLogoImage = styled.img<MuseumLogoImageProps>`
  display: block;
  font-size: 1em;
  max-width: 100%;
  border-radius: 50%;

  ${props => {
    switch (props.type) {
      case MuseumLogoImageType.WELCOME:
        return css`
          width: 35%;
          box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
          margin: 2em auto;
        `;
      case MuseumLogoImageType.HEADER:
        return css`
          width: 2em;
        `;
    }
  }}
`;

export default MuseumLogoImage;
