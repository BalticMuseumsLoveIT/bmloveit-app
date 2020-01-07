import styled from 'styled-components';

interface InnerHamburgerProps {
  isOpened: boolean;
}

const StyledWrapper = styled.button`
  border: none;
  background: none;
  padding: 0;
  outline: none;
  margin: 0.5em;
  width: 2em;
  height: 2em;
  font-size: 1em;
  line-height: 0;
  z-index: 3;
  grid-column-start: 5;
  grid-column-end: span 1;
`;

export const InnerHamburger = styled.div<InnerHamburgerProps>`
  position: relative;
  width: 2em;
  height: 0.3125em;
  background-color: ${({ theme, isOpened }) =>
    isOpened ? 'transparent' : theme.color.dark};
  transition: background-color 0.25s ease;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.dark};
    left: 0;
    transition: transform 0.25s ease;
  }

  ::before {
    top: -0.625em;
    transform: translateY(${({ isOpened }) => (isOpened ? '0.625em' : '0')})
      rotate(${({ isOpened }) => (isOpened ? '45deg' : '0')});
  }

  ::after {
    top: 0.625em;
    transform: translateY(${({ isOpened }) => (isOpened ? '-0.625em' : '0')})
      rotate(${({ isOpened }) => (isOpened ? '-45deg' : '0')});
  }
`;

export default StyledWrapper;
