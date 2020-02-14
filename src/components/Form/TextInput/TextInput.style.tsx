import { defaultBoxShadow } from 'components/Page/Page.style';
import styled from 'styled-components';
import { Field } from 'formik';

interface InputErrorProps {
  isCentered?: boolean;
}

const TextInput = styled(Field)`
  box-sizing: border-box;
  width: 100%;
  min-height: 52px;
  padding: 17px;
  border: none;
  border-radius: 8px;
  box-shadow: ${defaultBoxShadow};
  color: ${({ theme }) => theme.colors.form.textInput.default};
  outline: none;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.alternative.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.alternative.fontWeight};
  border: ${({ theme }) => `2px solid ${theme.colors.form.background}`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.form.textInput.placeholder};
  }

  &:hover {
    border: ${({ theme }) => `2px solid ${theme.colors.form.textInput.hover}`};
  }

  &:focus {
    border: ${({ theme }) => `2px solid ${theme.colors.form.textInput.focus}`};
  }
`;

export const InputError = styled.div<InputErrorProps>`
  color: ${({ theme }) => theme.colors.form.textInput.error};
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.alternative.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.alternative.fontWeight};
  margin-top: 10px;
  text-align: ${({ isCentered }) => isCentered && 'center'};
`;

export default TextInput;
