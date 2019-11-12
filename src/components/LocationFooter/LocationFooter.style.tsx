import styled from 'styled-components';

const StyledWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.primary};
`;

export default StyledWrapper;
