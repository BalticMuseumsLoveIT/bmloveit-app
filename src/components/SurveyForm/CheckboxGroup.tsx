import { SurveyOptionInterface } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import {
  CheckboxInput,
  CheckboxLabel,
  CheckboxWrapper,
} from 'components/Page/Page.style';
import { FieldProps } from 'formik';
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
          <CheckboxWrapper key={optionName}>
            <CheckboxInput
              type="checkbox"
              name={field.name}
              id={optionName}
              value={optionName}
              multiple
            />
            <CheckboxLabel htmlFor={optionName}>
              {getTranslatedString(
                option.description,
                option.description_translation,
              )}
            </CheckboxLabel>
          </CheckboxWrapper>
        );
      })}
    </>
  );
};
