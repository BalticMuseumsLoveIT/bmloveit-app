import { AppButton } from 'components/Buttons/AppButton.style';
import styled from 'styled-components';

export const OutlineButton = styled(AppButton)`
  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.outline.disabled.background
      : theme.colors.button.outline.default.background};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.outline.disabled.text
      : theme.colors.button.outline.default.text};
  border: ${({ theme }) =>
    `1px solid ${theme.colors.button.outline.default.text}`};
  box-shadow: unset;
  outline: none;

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.outline.disabled.background
        : theme.colors.button.outline.hover.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.outline.disabled.text
        : theme.colors.button.outline.hover.text};
    border: ${({ theme }) =>
      `1px solid ${theme.colors.button.outline.hover.text}`};
  }

  &:focus {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.outline.disabled.background
        : theme.colors.button.outline.focus.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.outline.disabled.text
        : theme.colors.button.outline.focus.text};
    border: ${({ theme }) =>
      `1px solid ${theme.colors.button.outline.focus.text}`};
  }
`;
