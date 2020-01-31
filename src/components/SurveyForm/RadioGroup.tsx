import { SurveyOptionInterface } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import { Field, FieldProps } from 'formik';
import React from 'react';

export interface RadioGroupProps extends FieldProps {
  options: Array<SurveyOptionInterface>;
}

export const RadioGroup = ({ field, options }: RadioGroupProps) => {
  return (
    <>
      {options.map(option => {
        const optionName = `option_${option.id}`;
        const isChecked = field.value === optionName;
        return (
          <div key={option.id}>
            <Field
              type="radio"
              name={field.name}
              id={optionName}
              value={optionName}
              checked={isChecked}
            />
            <label htmlFor={field.name}>
              {getTranslatedString(
                option.description,
                option.description_translation,
              )}
            </label>
          </div>
        );
      })}
    </>
  );
};
