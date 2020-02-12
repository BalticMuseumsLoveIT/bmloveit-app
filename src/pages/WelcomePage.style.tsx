import { HeaderImage, Title } from 'components/Page/Page.style';
import styled from 'styled-components';
import { em } from 'polished';

export const WelcomeHeaderImage = styled(HeaderImage)`
  border-bottom-left-radius: ${em(10)};
  border-bottom-right-radius: ${em(10)};
  position: relative;
`;

export const WelcomeTitle = styled(Title)`
  text-align: left;
  padding-bottom: 1em;
  position: relative;

  &::after {
    display: block;
    content: '';
    background: ${({ theme }) => theme.colors.background.alternative};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1em;
    height: ${em(2)};
  }
`;
