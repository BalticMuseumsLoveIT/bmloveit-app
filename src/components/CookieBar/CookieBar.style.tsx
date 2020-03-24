import { DefaultFontSize, LinkStyle } from 'components/Page/Page.style';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.header};
  display: flex;
  align-items: center;

  ${DefaultFontSize}
`;

export const InfoMessage = styled.p`
  font-size: 1em;
  line-height: 150%;
  margin: 1em;
  flex-grow: 1;
  font-family: ${props => props.theme.fonts.paragraph.fontFamily};
  font-weight: ${props => props.theme.fonts.paragraph.fontWeight};

  a {
    ${LinkStyle}
  }
`;
