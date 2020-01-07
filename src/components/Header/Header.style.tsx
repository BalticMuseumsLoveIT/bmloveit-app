import styled from 'styled-components';

const AppHeader = styled.header`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
`;

export const BackButton = styled.button`
  font-size: 1em;
  display: block;
  width: 2em;
  height: 2em;
  padding: 0;
  margin: 0.5em;
  grid-column-start: 1;
  grid-column-end: span 1;
`;

export default AppHeader;
