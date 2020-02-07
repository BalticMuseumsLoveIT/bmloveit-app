import styled, { css } from 'styled-components';

export enum LogoType {
  WELCOME,
  HEADER,
}
export interface LogoProps {
  type?: LogoType;
  usePlaceholder?: boolean;
}

export const Logo = styled.div<LogoProps>`
  display: block;
  overflow: hidden;
  border-radius: 50%;
  background: ${props => props.theme.colors.background.default};

  ${props => {
    switch (props.type) {
      case LogoType.HEADER:
        return css`
          width: 2em;
          padding: ${props.usePlaceholder ? '0.4em' : 0};
        `;
      case LogoType.WELCOME:
        return css`
          width: 35%;
          padding: ${props.usePlaceholder ? '10%' : 0};
          box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
          margin: 2em auto;
        `;
    }
  }}
`;

export const Image = styled.img`
  font-size: 1em;
  width: 100%;
  max-width: 100%;
  display: block;
`;
