import { SurveyOptionInterface } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import {
  RadioInput,
  RadioLabel,
  RadioWrapper,
} from 'components/Page/Page.style';
import { FieldProps } from 'formik';
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
          <RadioWrapper key={option.id}>
            <RadioInput
              type="radio"
              name={field.name}
              id={optionName}
              value={optionName}
              checked={isChecked}
            />
            <RadioLabel htmlFor={optionName}>
              {getTranslatedString(
                option.description,
                option.description_translation,
              )}
            </RadioLabel>
          </RadioWrapper>
        );
      })}
    </>
  );
};
