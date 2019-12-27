import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;

  a {
    display: inline-block;
    padding: 0.5em;
    margin-right: 0.5em;
    border: 1px solid thistle;
    border-radius: 3px;
    text-decoration: none;
  }

  a:hover {
    background: paleturquoise;
  }

  a:last-child {
    margin-right: 0;
  }
`;

export default StyledWrapper;
