import { Description, LinkStyle } from 'components/Page/Page.style';
import styled from 'styled-components';
import { em } from 'polished';

export const Image404 = styled.img`
  display: block;
  margin: 1em auto;
  min-width: ${em(200)};
  max-width: 50%;
`;

export const Info = styled(Description)`
  text-align: center;

  a {
    ${LinkStyle}
  }
`;
