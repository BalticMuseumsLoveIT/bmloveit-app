import { ButtonProps } from 'utils/interfaces';
import styled from 'styled-components';

interface LoginButtonProps extends ButtonProps {
  iconUrl: string;
}

const LoginButton = styled.button<LoginButtonProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 88%;
  max-width: 360px;
  padding: 24px;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.background
      : theme.colors.button.secondary.hover.background};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.text
      : theme.colors.button.secondary.hover.text};
  color: ${({ theme }) => theme.colors.text.paragraph};
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  font-size: 16px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  cursor: ${({ isDisabled }) => (isDisabled ? `default` : 'pointer')};
  box-shadow: 0 3px 6px #2a2c3e33;

  &:before {
    content: ${({ iconUrl }) => (iconUrl ? `url(${iconUrl})` : '')};
    width: 24px;
    height: 24px;
    margin-right: 24px;
  }

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

export default LoginButton;
