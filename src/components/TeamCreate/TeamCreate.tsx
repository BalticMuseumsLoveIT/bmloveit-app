import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';

export interface TeamCreateProps {
  onSubmit: (values: FormikValues) => Promise<void>;
}

export const TeamCreateForm = ({ onSubmit }: TeamCreateProps) => {
  const { t, ready } = useTranslation('team-page');

  if (!ready) return null;

  const initialValues = { teamName: '' };

  const validationSchema = Yup.object({
    teamName: Yup.string().required(
      t('validationSchema.name.required', 'Required'),
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form id="teamCreateForm">
        <div>
          <label htmlFor="teamName">
            {t('form.teamName.label', 'Team name')}
          </label>
          <Field name="teamName" type="text" />
          <ErrorMessage name="teamName" />
        </div>
        <div>
          <button type="submit">
            {t('form.button.create.text', 'Create')}
          </button>
        </div>
      </Form>
    </Formik>
  );
};
