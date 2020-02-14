import { DefaultFontSize } from 'components/Page/Page.style';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

const AppHeader = styled.header`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  align-items: center;

  ${DefaultFontSize}
`;

export const BackButtonCell = styled.div`
  grid-column-start: 1;
  grid-column-end: span 1;
`;

export const MuseumLogoCell = styled.div`
  grid-column-start: 2;
  grid-column-end: span 1;
`;

export const UserAvatarCell = styled.div`
  grid-column-start: 4;
  grid-column-end: span 1;
`;

export const ToggleSwitchCell = styled.div`
  grid-column-start: 5;
  grid-column-end: span 1;
  z-index: 20;
`;

export const BackButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  background: transparent;
  display: block;

  font-size: 1em;
  padding: 1em;
`;

export const BackButtonIcon = styled(SVG)`
  display: block;
  width: 1.5em;
  height: 1.5em;

  path {
    transition: fill 0.25s ease;

    fill: ${({ theme }) => theme.colors.icon.normal};

    ${BackButton}:hover & {
      fill: ${({ theme }) => theme.colors.icon.hover};
    }
  }
`;

export default AppHeader;
