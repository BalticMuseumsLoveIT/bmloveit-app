import { ButtonProps } from 'utils/interfaces';
import styled from 'styled-components';

export const AppButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88%;
  max-width: 360px;
  padding: 26px;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.primary.disabled.background
      : theme.colors.button.primary.default.background};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.primary.disabled.text
      : theme.colors.button.primary.default.text};
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  text-decoration: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  box-shadow: 0 3px 6px #2a2c3e33;

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
