import { Description, Title } from 'components/Page/Page.style';
import styled from 'styled-components';

export const ItemTitle = styled(Title)`
  text-align: left;
`;

export const AvatarChoiceDescription = styled(Description)`
  text-align: center;
`;

export const AudioPlayer = styled.audio`
  margin: 1em auto;
  display: block;
  width: 100%;
`;

export const VideoPlayer = styled.video`
  margin: 1em auto;
  display: block;
  width: 100%;
`;
