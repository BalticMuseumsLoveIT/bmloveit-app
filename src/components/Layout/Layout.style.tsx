import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${props => props.theme.colors.background.app};
  }
`;

const StyledWrapper = styled.div`
  max-width: 960px;
  margin: auto;
`;

export default StyledWrapper;
