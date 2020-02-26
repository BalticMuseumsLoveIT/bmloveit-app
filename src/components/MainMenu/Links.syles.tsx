import {
  LinkStyle,
  ParagraphFontStyle,
  SmallerFontSize,
} from 'components/Page/Page.style';
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
    ${SmallerFontSize};
    ${ParagraphFontStyle};
    ${LinkStyle};
  }
`;
