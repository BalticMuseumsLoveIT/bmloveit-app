import React from 'react';
import { FieldAttributes, useField } from 'formik';
import StyledFormikRadioButton from './FormikRadioButton.style';

const FormikRadioButton = ({
  label,
  correct,
  ...props
}: FieldAttributes<any>) => {
  const [field] = useField(props);
  const checked = props.id === field.value;

  return (
    <StyledFormikRadioButton checked={checked} correct={correct}>
      <input
        type="radio"
        value={props.id}
        checked={checked}
        {...field}
        {...props}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
    </StyledFormikRadioButton>
  );
};

export default FormikRadioButton;
