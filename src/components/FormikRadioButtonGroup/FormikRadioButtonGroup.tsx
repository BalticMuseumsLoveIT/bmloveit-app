import React from 'react';

type Props = {
  legend: string;
  disabled: boolean | undefined;
  touched: boolean | undefined;
  error: string | undefined;
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
      {touched && error ? (
        <div style={{ color: 'red', padding: '.5em' }}>&#9888; {error}</div>
      ) : null}
    </fieldset>
  );
};

export default FormikRadioButtonGroup;
