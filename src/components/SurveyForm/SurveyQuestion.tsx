import { SurveyQuestionInterface, SurveyQuestionType } from 'utils/interfaces';
import { CheckboxGroup } from 'components/SurveyForm/CheckboxGroup';
import { RadioGroup } from 'components/SurveyForm/RadioGroup';
import { QuestionImage } from 'components/SurveyForm/QuestionImage';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';

export interface SurveyQuestionProps extends FieldProps {
  question: SurveyQuestionInterface;
}

export const SurveyQuestion = ({ field, question }: SurveyQuestionProps) => {
  return (
    <fieldset>
      <legend>{question.description}</legend>
      <QuestionImage url={question.file_url} />
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
            return <Field name={field.name} component="textarea" />;
          default:
            return null;
        }
      })()}
      <ErrorMessage component="div" name={field.name} />
    </fieldset>
  );
};
