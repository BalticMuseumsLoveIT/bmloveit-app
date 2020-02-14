import { ButtonProps } from 'utils/interfaces';
import { defaultBoxShadow } from 'components/Page/Page.style';
import styled from 'styled-components';

export const AppButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 93%;
  max-width: 360px;
  padding: ${({ isThin }) => (isThin === true ? '17px' : '26px')};
  margin: 16px auto;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.primary.disabled.background
      : theme.colors.button.primary.default.background};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.primary.disabled.text
      : theme.colors.button.primary.default.text};
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  text-decoration: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  box-shadow: ${defaultBoxShadow};
  font-size: 1em;
  outline: none;

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
