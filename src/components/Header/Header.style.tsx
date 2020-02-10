import styled from 'styled-components';

const AppHeader = styled.header`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  align-items: center;

  & > div {
    box-sizing: border-box;
    padding: 0.5em;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
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
  z-index: 2;
`;

export const BackButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  background: transparent;
  display: block;

  font-size: 1em;
  padding: 0;

  svg {
    display: block;
    width: 1.5em;
    height: 1.5em;

    .b {
      fill: ${({ theme }) => theme.colors.text.paragraph};
    }
  }

  &:hover svg .b {
    fill: ${({ theme }) => theme.colors.background.alternative};
  }
`;

export default AppHeader;
