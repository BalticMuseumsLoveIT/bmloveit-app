import styled from 'styled-components';

interface StyledFormikRadioButtonProps {
  checked?: boolean;
  correct?: boolean;
}

const StyledFormikRadioButton = styled.div<StyledFormikRadioButtonProps>`
  padding: 0.2em 0;
  background: ${({ checked, correct, theme }) =>
    correct === true
      ? theme.color.successBackground
      : checked === true && correct === false
      ? theme.color.errorBackground
      : 'inherit'};
`;

export default StyledFormikRadioButton;
