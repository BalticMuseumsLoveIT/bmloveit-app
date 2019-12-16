import { QuizQuestionInterface } from 'utils/interfaces';
import { QuestionImage } from 'components/QuizForm/QuestionImage';
import StyledFormikRadioButton from 'components/QuizForm/QuizForm.style';
import { ErrorMessage, Field, useField } from 'formik';
import React from 'react';

export interface QuizQuestion {
  name: string;
  question: QuizQuestionInterface;
  isDisabled?: boolean;
}

export const QuizQuestion = function({
  name,
  isDisabled,
  question,
}: QuizQuestion) {
  const [field] = useField(name);

  return (
    <fieldset disabled={isDisabled}>
      <legend>{question.description}</legend>
      <QuestionImage url={question.file_url} />
      {question.options_data.map(option => {
        const optionName = `option_${option.id}`;
        const isChecked = field.value === optionName;
        return (
          <StyledFormikRadioButton
            key={option.id}
            isChecked={isChecked}
            isCorrect={option.correct}
          >
            <Field
              type="radio"
              name={name}
              id={optionName}
              value={optionName}
              checked={isChecked}
            />
            <label htmlFor={name}>{option.description}</label>
          </StyledFormikRadioButton>
        );
      })}
      <ErrorMessage component="div" name={name} />
    </fieldset>
  );
};