import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserAvatarLink = styled(Link)`
  display: block;
  grid-column-start: 4;
  grid-column-end: span 1;
`;

export const UserAvatarImage = styled.img`
  font-size: 1em;
  display: block;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin: 0.5em;
`;
