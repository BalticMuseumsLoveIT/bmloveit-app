import { ButtonProps } from 'utils/interfaces';
import {
  defaultBoxShadow,
  DefaultFontSize,
  SubtitleFontStyle,
} from 'components/Page/Page.style';
import styled from 'styled-components';
import { rem } from 'polished';

export const AppButton = styled.button<ButtonProps>`
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${rem(360)};

  padding: ${({ isThin }) => (isThin === true ? '1em' : '1.25em 1em')};
  margin: 1em auto;

  ${DefaultFontSize};
  ${SubtitleFontStyle};
  line-height: 1.5;
  text-decoration: none;
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.primary.disabled.text
      : theme.colors.button.primary.default.text};

  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.primary.disabled.background
      : theme.colors.button.primary.default.background};

  border: none;
  border-radius: 0.5em;

  box-shadow: ${defaultBoxShadow};

  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  outline: none;

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.primary.disabled.background
        : theme.colors.button.primary.hover.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.primary.disabled.text
        : theme.colors.button.primary.hover.text};
  }

  &:focus {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.primary.disabled.background
        : theme.colors.button.primary.focus.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.primary.disabled.text
        : theme.colors.button.primary.focus.text};
  }
`;
