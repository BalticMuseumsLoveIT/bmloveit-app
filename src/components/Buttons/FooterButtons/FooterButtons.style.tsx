import { ButtonProps } from 'utils/interfaces';
import {
  defaultBoxShadow,
  SmallerFontSize,
  SubtitleFontStyle,
} from 'components/Page/Page.style';
import styled from 'styled-components';
import { em, rem } from 'polished';

export const FooterButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5em;
  max-width: ${rem(480)};
  margin: 1em auto;
`;

export const FooterButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  outline: none;
  &::-moz-focus-inner {
    border: 0;
  }

  ${SubtitleFontStyle};
  ${SmallerFontSize};
  text-align: center;
  text-decoration: none;
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.text
      : theme.colors.button.secondary.default.text};

  padding: ${em(18, 14)};

  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.background
      : theme.colors.button.secondary.default.background};

  border-radius: ${em(8, 14)};
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  box-shadow: ${defaultBoxShadow};

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.background
        : theme.colors.button.secondary.hover.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.text
        : theme.colors.button.secondary.hover.text};
  }

  &:focus {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.background
        : theme.colors.button.secondary.focus.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.text
        : theme.colors.button.secondary.focus.text};
  }
`;
