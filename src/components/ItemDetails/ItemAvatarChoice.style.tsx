import {
  DefaultFontSize,
  LinkStyle,
  PlaceholderBackground,
  SubtitleFontStyle,
} from 'components/Page/Page.style';
import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';
import { em } from 'polished';

export const AvatarList = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
  ${DefaultFontSize}
`;

export const AvatarButtonPlaceholder = styled.div`
  ${PlaceholderBackground};

  width: 100%;
  border-radius: 50%;
  cursor: pointer;
`;

export const AvatarButtonPlaceholderImage = styled(SVG)`
  display: block;
  position: relative;
  width: 40%;
  padding: 30%;

  path {
    fill: ${({ theme }) => theme.colors.icon.normal};
  }
`;

export const AvatarButtonImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 50%;
  cursor: pointer;
`;

export const AvatarButtonLabel = styled.span`
  ${SubtitleFontStyle};
  ${LinkStyle};

  display: block;
  margin: 1em 0;
  cursor: pointer;
`;

export interface AvatarButtonProps {
  isSelected?: boolean;
}

export const AvatarButton = styled.button<AvatarButtonProps>`
  font-size: 1em;
  outline: none;
  border: none;
  margin: 0 5% 0 0;
  background: transparent;
  display: block;
  width: 20%;
  min-width: ${em(64)};

  padding: 0;

  &:focus {
    outline: none;
  }

  &:last-child {
    margin-right: 0;
  }

  ${props =>
    props.isSelected &&
    css`
      ${AvatarButtonPlaceholder}, ${AvatarButtonImage} {
        box-shadow: 0 0 ${em(4)} ${em(1)}
          ${({ theme }) => theme.colors.background.alternative};
      }

      ${AvatarButtonLabel} {
        color: ${({ theme }) => theme.colors.text.anchor.active};
      }
    `}
`;
