import '@material/react-linear-progress/dist/linear-progress.css';
import LinearProgress from '@material/react-linear-progress';
import styled from 'styled-components';
import { em } from 'polished';

export const Indicator = styled(LinearProgress)`
  --mdc-theme-primary: ${({ theme }) => theme.colors.background.default};

  height: ${em(2)} !important;

  .mdc-linear-progress__buffer {
    background-color: ${({ theme }) => theme.colors.background.placeholder};
  }
`;
