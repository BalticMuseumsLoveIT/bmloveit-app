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
  outline: none;
  border: none;
  cursor: pointer;
  margin: 10px;
  padding: 15px;
  width: 24px;
  height: 24px;
  background: center center url('/images/close-24px.svg');
`;
