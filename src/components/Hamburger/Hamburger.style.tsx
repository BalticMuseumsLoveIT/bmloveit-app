import styled from 'styled-components';

interface InnerHamburgerProps {
  isOpened: boolean;
}

const StyledWrapper = styled.button`
  border: none;
  background: none;
  padding: 20px 15px;
  z-index: 3;
`;

export const InnerHamburger = styled.div<InnerHamburgerProps>`
  position: relative;
  width: 25px;
  height: 4px;
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
    top: -8px;
    transform: translateY(${({ isOpened }) => (isOpened ? '8px' : '0')})
      rotate(${({ isOpened }) => (isOpened ? '45deg' : '0')});
  }

  ::after {
    top: 8px;
    transform: translateY(${({ isOpened }) => (isOpened ? '-8px' : '0')})
      rotate(${({ isOpened }) => (isOpened ? '-45deg' : '0')});
  }
`;

export default StyledWrapper;
