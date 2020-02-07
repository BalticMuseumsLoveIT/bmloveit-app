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
          width: 2em;
          padding: ${props.usePlaceholder ? '0.6em' : 0};
        `;
      case UserAvatarType.PROFILE:
        return css`
          width: 35%;
          padding: ${props.usePlaceholder ? '10%' : 0};
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
