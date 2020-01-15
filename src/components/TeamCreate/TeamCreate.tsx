import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

export interface TeamCreateFormValues {
  teamName: string;
}

export interface TeamCreateProps {
  onSubmit: (
    values: TeamCreateFormValues,
    formikBag: FormikHelpers<TeamCreateFormValues>,
  ) => Promise<void>;
}

export const TeamCreateForm = ({ onSubmit }: TeamCreateProps) => {
  const { t, ready } = useTranslation('team-page');

  if (!ready) return null;

  const initialValues: TeamCreateFormValues = { teamName: '' };

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
      {({ status }) => (
        <Form id="teamCreateForm">
          <div>
            <label htmlFor="teamName">
              {t('form.teamName.label', 'Team name')}
            </label>
            <Field name="teamName" type="text" />
            <ErrorMessage name="teamName" />
          </div>
          <div>
            {status && <p>{status()}</p>}
            <button type="submit">
              {t('form.button.create.text', 'Create')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
