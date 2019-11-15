import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  margin: 15px 0;
  padding: 15px;
  background-color: ${({ theme }) => theme.color.primary};
`;

export default StyledWrapper;
