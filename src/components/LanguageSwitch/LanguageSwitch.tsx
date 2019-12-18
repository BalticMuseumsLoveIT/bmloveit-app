import { CommonLanguageInterface } from 'utils/interfaces';
import React from 'react';
import * as Yup from 'yup';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from 'formik';

export interface LanguageSwitchValues {
  language: string;
}

interface LanguageSwitchProps {
  list: Array<CommonLanguageInterface>;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<LanguageSwitchValues>,
  ) => void;
}

export const LanguageSwitch = ({ list, onSubmit }: LanguageSwitchProps) => {
  const initialValues: LanguageSwitchValues = { language: '' };
  const validationSchema = Yup.object().shape({
    language: Yup.string().required('Please choose preferred language'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form>
          <div>
            <Field as="select" name="language">
              <option value="">Choose a language</option>
              {list.map(language => (
                <option key={language.id} value={language.key}>
                  {language.value}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="language" component="div" />
          <div>
            <button type="submit" disabled={formik.isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
