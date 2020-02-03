import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

export const CardListItem = styled.li`
  width: 4em;
  height: 4em;
  margin-right: 0.25em;
`;

export const Card = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  border-radius: 0.25em;
  overflow: hidden;
`;

export const CardIcon = styled.img`
  max-width: 80%;
  max-height: 80%;
`;
