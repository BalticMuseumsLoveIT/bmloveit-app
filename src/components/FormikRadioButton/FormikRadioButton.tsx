import React from 'react';
import { FieldAttributes, useField } from 'formik';
import StyledFormikRadioButton from './FormikRadioButton.style';

const FormikRadioButton = ({
  label,
  isCorrect,
  ...props
}: FieldAttributes<any>) => {
  const [field] = useField(props);
  const isChecked = props.id === field.value;

  return (
    <StyledFormikRadioButton isChecked={isChecked} isCorrect={isCorrect}>
      <input
        type="radio"
        {...field}
        {...props}
        value={props.id}
        checked={isChecked}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
    </StyledFormikRadioButton>
  );
};

export default FormikRadioButton;
