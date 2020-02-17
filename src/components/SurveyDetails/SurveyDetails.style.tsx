import SVG from 'react-inlinesvg';
import styled from 'styled-components';

export const AbstractDuck = styled(SVG)`
  display: block;
  margin: 2em auto;
  max-width: 50%;

  .default {
    fill: ${({ theme }) => theme.colors.background.default};
  }

  .app {
    fill: ${({ theme }) => theme.colors.background.app};
  }

  .alternative {
    fill: ${({ theme }) => theme.colors.background.alternative};
  }

  .negative {
    fill: ${({ theme }) => theme.colors.background.negative};
  }
`;

export const Tick = styled(SVG)`
  display: block;
  margin: 2em auto;
  max-width: 50%;

  .circle {
    fill: ${({ theme }) => theme.colors.background.alternative};
  }

  .tick {
    fill: ${({ theme }) => theme.colors.background.default};
  }
`;
