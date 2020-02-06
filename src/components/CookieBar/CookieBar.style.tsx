import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.header};
  display: flex;
  align-items: center;
`;

export const InfoMessage = styled.p`
  margin: 1em;
  flex-grow: 1;
  font-family: ${props => props.theme.fonts.paragraph.fontFamily};
  font-weight: ${props => props.theme.fonts.paragraph.fontWeight};

  a {
    color: ${({ theme }) => theme.colors.text.anchor.link};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text.anchor.hover};
  }
`;

export const CloseButton = styled.button`
  padding: 0;
  outline: none;
  margin: 1em;
  font-size: 1em;
  width: 2em;
  height: 2em;
`;
