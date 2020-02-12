import { ButtonProps } from 'utils/interfaces';
import styled from 'styled-components';

export const FooterButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  width: 94%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

export const FooterButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 10px;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.background
      : theme.colors.button.secondary.default.background};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.text
      : theme.colors.button.secondary.default.text};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  line-height: 1;
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};

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
