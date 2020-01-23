import styled from 'styled-components';

interface StyledWrapperProps {
  isOpened: boolean;
}

const StyledWrapper = styled.nav<StyledWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.primary};
  transform: translateX(${({ isOpened }) => (isOpened ? '0' : '-100%')});
  transition: transform 0.25s ease;
  z-index: 2;
`;

export const StyledLogo = styled.img`
  display: block;
  max-width: 10em;
`;

export const LinkList = styled.ul`
  list-style: none;
  margin: 1em 0;
  padding: 0;
`;

export const LinkItem = styled.li`
  text-align: center;
  line-height: 150%;
`;

export default StyledWrapper;
