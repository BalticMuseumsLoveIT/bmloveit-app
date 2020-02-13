import { HeaderImage } from 'components/Page/Page.style';
import styled from 'styled-components';
import { em } from 'polished';

export const WelcomeHeaderImage = styled(HeaderImage)`
  border-bottom-left-radius: ${em(10)};
  border-bottom-right-radius: ${em(10)};
  position: relative;
`;
