import styled from 'styled-components';

interface AppButtonProps {
  isDisabled?: boolean;
}

export const AppButton = styled.button<AppButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88%;
  max-width: 326px;
  padding: 26px;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.background.disabled
      : theme.colors.background.alternative};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.text.anchor.disabled
      : theme.colors.text.alternative};
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  text-decoration: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
`;
