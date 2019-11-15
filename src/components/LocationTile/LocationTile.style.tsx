import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  margin: 15px 0;
  padding: 15px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.dark};
`;

export default StyledWrapper;
