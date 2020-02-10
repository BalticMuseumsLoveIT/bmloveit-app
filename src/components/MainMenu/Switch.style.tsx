import styled from 'styled-components';
import { em } from 'polished';

export const Button = styled.button`
  border: none;
  background: none;
  padding: 0;
  outline: none;
  display: block;
  width: ${em(24)};
  height: ${em(24)};
  font-size: 1em;
  line-height: 0;
  z-index: 3;
  grid-column-start: 5;
  grid-column-end: span 1;
  cursor: pointer;
`;

interface SwitchInnerProps {
  isOpened: boolean;
}

export const Hamburger = styled.div<SwitchInnerProps>`
  margin: 0 auto;
  position: relative;
  width: ${em(20)};
  height: ${em(2)};
  background-color: ${({ theme, isOpened }) =>
    isOpened ? 'transparent' : theme.colors.text.paragraph};
  transition: background-color 0.25s ease;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.text.paragraph};
    left: 0;
    transition: transform 0.25s ease;
  }

  ::before {
    top: ${em(-6)};
    transform: translateY(${({ isOpened }) => (isOpened ? em(6) : '0')})
      rotate(${({ isOpened }) => (isOpened ? '45deg' : '0')});
  }

  ::after {
    top: ${em(6)};
    transform: translateY(${({ isOpened }) => (isOpened ? em(-6) : '0')})
      rotate(${({ isOpened }) => (isOpened ? '-45deg' : '0')});
  }

  ${Button}:hover & {
    background-color: ${({ theme, isOpened }) =>
      isOpened ? 'transparent' : theme.colors.background.alternative};

    ::before,
    ::after {
      background-color: ${({ theme }) => theme.colors.background.alternative};
    }
  }
`;
