import { SurveyDetailsInterface } from 'utils/interfaces';
import {
  extractInitialValues,
  extractValidationSchema,
} from 'components/SurveyForm/helpers';
import { Field, Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { SurveyQuestion } from './SurveyQuestion';

export interface SurveyFormProps {
  survey: SurveyDetailsInterface;
  onSubmit: (values: FormikValues) => Promise<void>;
}

export const SurveyForm = ({ survey, onSubmit }: SurveyFormProps) => {
  const initialValues = extractInitialValues(survey.questions_data);
  const validationSchema = extractValidationSchema(survey.questions_data);

  return (
    <>
      <h2>{survey.name}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            {survey.questions_data.map(question => (
              <Field
                key={question.id}
                name={`question_${question.id}`}
                question={question}
                component={SurveyQuestion}
              />
            ))}
            <button type="submit" disabled={formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
