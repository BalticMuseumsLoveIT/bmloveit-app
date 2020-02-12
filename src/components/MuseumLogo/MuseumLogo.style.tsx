import { em } from 'polished';
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
          width: ${em(36)};
        `;
      case LogoType.WELCOME:
        return css`
          width: 35%;
          box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
          margin: 2em auto;
        `;
    }
  }}

  img {
    box-sizing: border-box;
    font-size: 1em;
    width: 100%;
    max-width: 100%;
    display: block;

    ${props => {
      switch (props.type) {
        case LogoType.HEADER:
          return css`
            padding: ${props.usePlaceholder ? '0.3em' : 0};
          `;
        case LogoType.WELCOME:
          return css`
            padding: ${props.usePlaceholder ? '20%' : 0};
          `;
      }
    }}
  }
`;
