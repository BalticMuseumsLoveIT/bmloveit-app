import { DefaultFontSizeRange } from 'components/Page/Page.style';
import styled from 'styled-components';
import { em } from 'polished';

export const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 1em;
  background: transparent;
  display: block;
  box-sizing: content-box;
  font-size: 1em;
  width: ${em(24)};
  height: ${em(24)};
  z-index: 11;
`;

interface SwitchInnerProps {
  isOpened: boolean;
}

const base = DefaultFontSizeRange.fromSize;

export const Hamburger = styled.div<SwitchInnerProps>`
  margin: 0 auto;
  position: relative;
  width: ${em(20, base)};
  height: ${em(2, base)};
  background-color: ${({ theme, isOpened }) =>
    isOpened ? 'transparent' : theme.colors.icon.normal};
  transition: background-color 0.25s ease;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.icon.normal};
    left: 0;
    transition: transform 0.25s ease, background-color 0.25s ease;
  }

  ::before {
    top: ${em(-6, base)};
    transform: translateY(${({ isOpened }) => (isOpened ? em(6, base) : '0')})
      rotate(${({ isOpened }) => (isOpened ? '45deg' : '0')});
  }

  ::after {
    top: ${em(6, base)};
    transform: translateY(${({ isOpened }) => (isOpened ? em(-6, base) : '0')})
      rotate(${({ isOpened }) => (isOpened ? '-45deg' : '0')});
  }

  ${Button}:hover & {
    background-color: ${({ theme, isOpened }) =>
      isOpened ? 'transparent' : theme.colors.icon.hover};

    ::before,
    ::after {
      background-color: ${({ theme }) => theme.colors.icon.hover};
    }
  }
`;
