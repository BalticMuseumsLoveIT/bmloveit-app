import { defaultBoxShadow } from 'components/Page/Page.style';
import { ButtonProps } from 'utils/interfaces';
import styled from 'styled-components';

export const ClipboardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 1em;
  color: ${({ theme }) => theme.fonts.subheader.fontFamily};
  background-color: ${({ theme }) => theme.fonts.subheader.fontFamily};
  border: none;
  border-radius: 8px;
  box-shadow: ${defaultBoxShadow};
  padding: 17px;
  color: ${({ theme }) => theme.colors.button.secondary.default.text};
  background-color: ${({ theme }) =>
    theme.colors.button.secondary.default.background};
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.colors.button.secondary.hover.text};
  }

  &:focus {
    background-color: ${({ theme }) =>
      theme.colors.button.secondary.focus.background};
    color: ${({ theme }) => theme.colors.button.secondary.focus.text};
  }
`;
