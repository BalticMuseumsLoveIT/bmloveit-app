import {
  DefaultGridPaddingRage,
  fluidRangeMinMax,
  defaultBoxShadow,
} from 'components/Page/Page.style';
import { em } from 'polished';
import styled, { css } from 'styled-components';
import fluidRange from 'polished/lib/mixins/fluidRange';

export enum LogoType {
  WELCOME,
  HEADER,
  WELCOME_HEADER,
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
          box-shadow: ${defaultBoxShadow};
          margin: 2em auto;
        `;
      case LogoType.WELCOME_HEADER:
        return css`
          width: 20%;
          min-width: ${em(64)};
          position: absolute;
          ${fluidRange(
            [
              {
                prop: 'left',
                ...DefaultGridPaddingRage,
              },
              {
                prop: 'bottom',
                ...DefaultGridPaddingRage,
              },
            ],
            ...Object.values(fluidRangeMinMax),
          )}
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
