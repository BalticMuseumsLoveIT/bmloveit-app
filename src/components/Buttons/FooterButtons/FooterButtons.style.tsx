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
    isDisabled ? theme.colors.background.button.disabled : '#ffffff'};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.text.button.disabled
      : theme.colors.text.paragraph};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  line-height: 1;
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.button.hover2};
    color: ${({ theme }) => theme.colors.text.anchor.hover};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.background.button.hover2};
    color: ${({ theme }) => theme.colors.background.button.focus};
  }
`;
