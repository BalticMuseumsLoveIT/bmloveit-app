import styled from 'styled-components';

const StyledWrapper = styled.div`
  color: white;
  background-color: ${({ theme }): any => theme.colors.headerBackground};
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    li {
      padding: 0 10px;
    }
  }
`;

export default StyledWrapper;
