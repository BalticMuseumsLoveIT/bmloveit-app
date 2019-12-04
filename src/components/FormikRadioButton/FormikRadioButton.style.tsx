import styled from 'styled-components';

interface StyledFormikRadioButtonProps {
  isChecked?: boolean;
  isCorrect?: boolean;
}

const StyledFormikRadioButton = styled.div<StyledFormikRadioButtonProps>`
  padding: 0.2em 0;
  background: ${({ isChecked, isCorrect, theme }) =>
    isCorrect === true
      ? theme.color.successBackground
      : isChecked === true && isCorrect === false
      ? theme.color.errorBackground
      : 'inherit'};
`;

export default StyledFormikRadioButton;
