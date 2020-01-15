import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

export interface TeamJoinFormValues {
  teamName: string;
  teamAccessCode: string;
}

export interface TeamJoinProps {
  onSubmit: (
    values: TeamJoinFormValues,
    formikBag: FormikHelpers<TeamJoinFormValues>,
  ) => Promise<void>;
}

export const TeamJoinForm = ({ onSubmit }: TeamJoinProps) => {
  const { t, ready } = useTranslation('team-page');

  if (!ready) return null;

  const initialValues: TeamJoinFormValues = {
    teamName: '',
    teamAccessCode: '',
  };

  const validationSchema = Yup.object({
    teamName: Yup.string().required(
      t('validationSchema.teamName.required', 'Required'),
    ),
    teamAccessCode: Yup.string().required(
      t('validationSchema.teamAccessCode.required', 'Required'),
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ status }) => (
        <Form id="teamJoinForm">
          <div>
            <label htmlFor="teamName">
              {t('form.teamName.label', 'Team name')}
            </label>
            <Field name="teamName" type="text" />
            <ErrorMessage name="teamName" />
          </div>
          <div>
            <label htmlFor="teamAccessCode">
              {t('form.teamAccessCode.label', 'Team access code')}
            </label>
            <Field name="teamAccessCode" type="password" />
            <ErrorMessage name="teamAccessCode" />
          </div>
          <div>
            {status && <p>{status()}</p>}
            <button type="submit">{t('form.button.join.text', 'Join')}</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
