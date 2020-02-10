import { ButtonProps } from 'utils/interfaces';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.header};
  display: flex;
  align-items: center;
`;

export const InfoMessage = styled.p`
  margin: 1em;
  flex-grow: 1;
  font-family: ${props => props.theme.fonts.paragraph.fontFamily};
  font-weight: ${props => props.theme.fonts.paragraph.fontWeight};

  a {
    color: ${({ theme }) => theme.colors.text.anchor.link};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text.anchor.hover};
  }
`;

export const CloseButton = styled.button<ButtonProps>`
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  background: transparent;

  font-size: 1em;
  padding: 0.875em;

  svg {
    display: block;
    width: 1.5em;
    height: 1.5em;

    .a {
      fill: ${({ theme, isDisabled }) =>
        isDisabled
          ? theme.colors.text.button.disabled
          : theme.colors.text.paragraph};
    }
  }

  &:hover svg .a {
    fill: ${({ theme }) => theme.colors.background.button.default};
  }

  &:focus svg .a {
    fill: ${({ theme }) => theme.colors.background.button.focus};
  }
`;
