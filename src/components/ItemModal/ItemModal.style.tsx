import { CloseButton } from 'components/Page/Page.style';
import { LayoutGridHeader } from 'components/Layout/Layout.style';
import styled from 'styled-components';

export const ModalLayoutGridHeader = styled(LayoutGridHeader)`
  display: grid;
  grid-template-columns: 1fr auto;
`;

export const ModalCloseButton = styled(CloseButton)`
  grid-column: 2 / span 1;
`;

export const ModalImage = styled.img`
  display: block;
  width: 100%;
`;
