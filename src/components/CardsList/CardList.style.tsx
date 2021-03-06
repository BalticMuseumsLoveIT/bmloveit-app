import { PlaceholderBackground } from 'components/Page/Page.style';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
`;

export const CardListItem = styled.li`
  position: relative;
  box-sizing: border-box;
  width: 10%;
  min-width: 3em;
  margin-right: 2%;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Card = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10%;

  ${PlaceholderBackground}
`;

export const CardIcon = styled.img`
  max-width: 80%;
  max-height: 80%;
  min-width: 40%;
  min-height: 40%;
`;
