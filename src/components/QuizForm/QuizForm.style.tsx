import styled from 'styled-components';
import { em } from 'polished';

interface StyledFormikRadioButtonProps {
  isChecked?: boolean;
  isCorrect?: boolean;
}

const StyledFormikRadioButton = styled.div<StyledFormikRadioButtonProps>`
  display: flex;
  align-items: center;
  margin: ${em(12)} 0;
  border-radius: 2em;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background.default};
  box-shadow: ${({ isChecked, isCorrect, theme }) =>
    isCorrect === true
      ? `0 0 3px 1px ${theme.colors.text.success}`
      : isChecked === true && isCorrect === false
      ? `0 0 3px 1px ${theme.colors.text.error}`
      : 'none'};
`;

export default StyledFormikRadioButton;
