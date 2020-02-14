import { QuizQuestionInterface } from 'utils/interfaces';
import { QuestionImage } from 'components/QuizForm/QuestionImage';
import StyledFormikRadioButton from 'components/QuizForm/QuizForm.style';
import { getTranslatedString } from 'utils/helpers';
import {
  Fieldset,
  FormValidation,
  Legend,
  RadioInput,
  RadioLabel,
} from 'components/Page/Page.style';
import { ErrorMessage, useField } from 'formik';
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
    <Fieldset disabled={isDisabled}>
      <Legend>
        {getTranslatedString(
          question.description,
          question.description_translation || [],
        )}
      </Legend>
      <QuestionImage path={question.file_url} />
      {question.options_data.map(option => {
        const optionName = `option_${option.id}`;
        const isChecked = field.value === optionName;
        return (
          <StyledFormikRadioButton
            key={option.id}
            isChecked={isChecked}
            isCorrect={option.correct}
          >
            <RadioInput
              type="radio"
              name={name}
              id={optionName}
              value={optionName}
              checked={isChecked}
            />
            <RadioLabel htmlFor={optionName}>
              {getTranslatedString(
                option.description,
                option.description_translation || [],
              )}
            </RadioLabel>
          </StyledFormikRadioButton>
        );
      })}
      <ErrorMessage component={FormValidation} name={name} />
    </Fieldset>
  );
};
