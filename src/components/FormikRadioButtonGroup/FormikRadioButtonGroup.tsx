import React from 'react';
import StyledError from './FormikRadioButtonGroup.style';

type Props = {
  legend: string;
  disabled?: boolean;
  touched?: boolean;
  error?: string;
  children: React.ReactNode;
};

const FormikRadioButtonGroup: React.FC<Props> = ({
  disabled,
  legend,
  touched,
  error,
  children,
}: Props) => {
  return (
    <fieldset disabled={disabled}>
      <legend>{legend}</legend>
      {children}
      {touched && error && <StyledError>{error}</StyledError>}
    </fieldset>
  );
};

export default FormikRadioButtonGroup;
