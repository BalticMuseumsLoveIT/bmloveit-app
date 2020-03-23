import { SmallerFontSize, SubtitleFontStyle } from 'components/Page/Page.style';
import styled from 'styled-components';

interface SummaryProps {
  isCorrect?: boolean;
}

export const Summary = styled.p<SummaryProps>`
  ${SmallerFontSize}
  ${SubtitleFontStyle};

  text-align: center;

  color: ${({ isCorrect, theme }) =>
    isCorrect === true
      ? theme.colors.text.success
      : isCorrect === false
      ? theme.colors.text.error
      : theme.colors.text.paragraph};
`;
