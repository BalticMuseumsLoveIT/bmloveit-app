import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.color.background.alternative};
  color: ${({ theme }) => theme.color.font.alternative};
  display: flex;
  align-items: center;
`;

export const InfoMessage = styled.p`
  margin: 0.5em;
  flex-grow: 1;

  a {
    color: ${({ theme }) => theme.color.link.primary};
  }

  a:hover {
    color: ${({ theme }) => theme.color.link.hover};
  }
`;

export const CloseButton = styled.button`
  padding: 0;
  outline: none;
  margin: 0.5em;
  font-size: 1em;
  width: 2em;
  height: 2em;
`;
