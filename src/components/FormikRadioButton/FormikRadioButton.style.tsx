import styled, { css } from 'styled-components';

interface StyledFormikRadioButtonProps {
  checked: boolean | undefined;
  correct: boolean | undefined;
}

const StyledFormikRadioButton = styled.div<StyledFormikRadioButtonProps>`
  padding: 0.2em 0;

  ${props =>
    props.correct === true &&
    css`
      background: rgba(0, 255, 0, 0.2);
    `}

  ${props =>
    props.checked === true &&
    props.correct === false &&
    css`
      background: rgba(255, 0, 0, 0.2);
    `}
`;

export default StyledFormikRadioButton;
