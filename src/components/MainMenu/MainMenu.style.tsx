import { DefaultFontSize } from 'components/Page/Page.style';
import CookieBar from 'components/CookieBar/CookieBar';
import styled from 'styled-components';
import { em } from 'polished';

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
  z-index: 10;
`;

export const DummyLayoutGridCookie = styled(CookieBar)`
  visibility: hidden;
`;

export const DummyLayoutGridHeader = styled.div`
  ${DefaultFontSize};
  padding: ${em(27)} 0;
`;

export const Content = styled.div`
  width: 100%;
  padding: 3.5em;
  max-width: 25em;
`;
