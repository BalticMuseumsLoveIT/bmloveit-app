import styled from 'styled-components';

export const LinkList = styled.ul`
  font-size: 1em;
  list-style: none;
  margin: 2.5em 0;
  padding: 0;
`;

export const LinkItem = styled.li`
  text-align: center;
  line-height: 150%;

  a {
    font-size: 0.875em;
    font-family: ${props => props.theme.fonts.paragraph.fontFamily};
    font-weight: ${props => props.theme.fonts.paragraph.fontWeight};
    color: ${props => props.theme.colors.text.header};

    &:hover {
      text-decoration: none;
    }
  }
`;
