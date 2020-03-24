import { em } from 'polished';
import styled, { css } from 'styled-components';

export enum UserAvatarType {
  HEADER,
  PROFILE,
}

export interface UserAvatarProps {
  type?: UserAvatarType;
  usePlaceholder?: boolean;
}

export const UserAvatar = styled.div<UserAvatarProps>`
  display: block;
  overflow: hidden;
  border-radius: 50%;
  background: ${props => props.theme.colors.background.default};

  ${props => {
    switch (props.type) {
      case UserAvatarType.HEADER:
        return css`
          width: ${em(36)};
        `;
      case UserAvatarType.PROFILE:
        return css`
          width: 35%;
          min-width: ${em(160)};
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
        case UserAvatarType.HEADER:
          return css`
            padding: ${props.usePlaceholder ? '0.5em' : 0};
          `;
        case UserAvatarType.PROFILE:
          return css`
            padding: ${props.usePlaceholder ? '25%' : 0};
          `;
      }
    }}
  }
`;
