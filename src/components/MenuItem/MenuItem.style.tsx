import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.dark};
  padding: 10px;
`;

export default StyledWrapper;
