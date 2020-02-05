import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const StyledWrapper = styled.div`
  max-width: 960px;
  margin: auto;
  background: ${({ theme }) => theme.colors.background.app};
`;

export default StyledWrapper;
