import styled from 'styled-components';

interface StyledWrapperProps {
  isOpened: boolean;
}

export const Wrapper = styled.nav<StyledWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.menu};
  transform: translateX(${({ isOpened }) => (isOpened ? '0' : '-100%')});
  transition: transform 0.25s ease;
  z-index: 1;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 25em;
`;
