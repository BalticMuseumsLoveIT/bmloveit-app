import styled from 'styled-components';

const StyledError = styled.div`
  padding: 0.5em;
  color: ${({ theme }) => theme.color.error};

  &:before {
    content: '\u26A0 ';
  }
`;

export default StyledError;
