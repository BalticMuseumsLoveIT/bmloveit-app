import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${({ theme }) => theme.color.primary};
`;

const NavButton = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.dark};
`;

export const PrevButton = styled(NavButton)``;

export const NextButton = styled(NavButton)`
  grid-column: 3;
  justify-self: end;
`;

export default StyledWrapper;
