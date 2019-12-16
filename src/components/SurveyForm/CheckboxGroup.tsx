import { SurveyOptionInterface } from 'utils/interfaces';
import { Field, FieldProps } from 'formik';
import React from 'react';

export interface CheckboxGroupProps extends FieldProps {
  options: Array<SurveyOptionInterface>;
}

export const CheckboxGroup = ({ field, options }: CheckboxGroupProps) => {
  return (
    <>
      {options.map(option => {
        const optionName = `option_${option.id}`;
        return (
          <div key={optionName}>
            <Field
              type="checkbox"
              name={field.name}
              id={optionName}
              value={optionName}
              multiple
            />
            <label htmlFor={optionName}>{option.description}</label>
          </div>
        );
      })}
    </>
  );
};
