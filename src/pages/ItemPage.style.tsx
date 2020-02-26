import {
  Description,
  NegativeGridPadding,
  Title,
} from 'components/Page/Page.style';
import styled from 'styled-components';

export const ItemTitle = styled(Title)`
  text-align: left;
`;

export const ZoomGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  position: relative;
`;

export const ZoomGridHeader = styled.div`
  grid-row: 1 / span 1;
`;

export const ZoomGridMap = styled.div`
  grid-row: 2 / span 1;
  ${NegativeGridPadding}

  & > div {
    height: 100%;
  }
`;

export const ZoomGridFooter = styled.div`
  grid-row: 3 / span 1;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
