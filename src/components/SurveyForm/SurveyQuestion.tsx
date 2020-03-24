import { SurveyQuestionInterface, SurveyQuestionType } from 'utils/interfaces';
import { CheckboxGroup } from 'components/SurveyForm/CheckboxGroup';
import { RadioGroup } from 'components/SurveyForm/RadioGroup';
import { QuestionImage } from 'components/SurveyForm/QuestionImage';
import { getTranslatedString } from 'utils/helpers';
import {
  Fieldset,
  FormValidation,
  Legend,
  Textarea,
} from 'components/Page/Page.style';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';

export interface SurveyQuestionProps extends FieldProps {
  question: SurveyQuestionInterface;
}

export const SurveyQuestion = ({ field, question }: SurveyQuestionProps) => {
  return (
    <Fieldset>
      <Legend>
        {getTranslatedString(
          question.description,
          question.description_translation,
        )}
      </Legend>
      <QuestionImage path={question.file_url} />
      {(() => {
        switch (question.type) {
          case SurveyQuestionType.SELECT:
            return (
              <Field
                name={field.name}
                component={RadioGroup}
                options={question.options_data}
              />
            );
          case SurveyQuestionType.MULTISELECT:
            return (
              <Field
                name={field.name}
                component={CheckboxGroup}
                options={question.options_data}
              />
            );
          case SurveyQuestionType.OPEN:
            return <Textarea name={field.name} component="textarea" />;
          default:
            return null;
        }
      })()}
      <ErrorMessage component={FormValidation} name={field.name} />
    </Fieldset>
  );
};
