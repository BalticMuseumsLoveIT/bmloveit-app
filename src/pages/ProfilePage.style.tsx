import {
  ButtonLink,
  DefaultFontSize,
  Emphasize,
} from 'components/Page/Page.style';
import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  margin: 1em 0 4em 0;
`;

export const ProgressBarSummary = styled(Emphasize)`
  margin: 1em 0;
`;

export const LogoutButton = styled(ButtonLink)`
  font-family: ${props => props.theme.fonts.subheader.fontFamily};
  font-weight: ${props => props.theme.fonts.subheader.fontWeight};
  ${DefaultFontSize}
  display: block;
  padding: 0.5em;
  margin: 1em auto;
`;
