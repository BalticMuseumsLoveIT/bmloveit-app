import {
  AlternativeFontStyle,
  defaultBoxShadow,
  ExtraSmallFontSize,
  SmallerFontSize,
} from 'components/Page/Page.style';
import styled from 'styled-components';
import { Field } from 'formik';
import { em } from 'polished';

interface InputErrorProps {
  isCentered?: boolean;
}

const TextInput = styled(Field)`
  box-sizing: border-box;
  width: 100%;

  ${SmallerFontSize};
  ${AlternativeFontStyle};
  line-height: ${20 / 14};

  padding: ${em(16, 14)};

  border: none;
  border-radius: ${em(8, 14)};

  box-shadow: ${defaultBoxShadow};
  color: ${({ theme }) => theme.colors.form.textInput.default};
  outline: none;

  border: ${({ theme }) =>
    `${em(2, 14)} solid ${theme.colors.form.background}`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.form.textInput.placeholder};
  }

  &:hover {
    border: ${({ theme }) =>
      `${em(2, 14)} solid ${theme.colors.form.textInput.hover}`};
  }

  &:focus {
    border: ${({ theme }) =>
      `${em(2, 14)} solid ${theme.colors.form.textInput.focus}`};
  }
`;

export const InputError = styled.div<InputErrorProps>`
  ${ExtraSmallFontSize};
  ${AlternativeFontStyle};

  color: ${({ theme }) => theme.colors.form.textInput.error};
  margin-top: ${em(8, 12)};
  text-align: ${({ isCentered }) => isCentered && 'center'};
`;

export default TextInput;
