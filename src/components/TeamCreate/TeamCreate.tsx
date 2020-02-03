import i18n from 'i18n';
import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

export interface TeamCreateFormValues {
  teamName: string;
}

export interface TeamCreateProps {
  onSubmit: (teamName: string) => Promise<void>;
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

  const handleSubmit = async (
    values: TeamCreateFormValues,
    formik: FormikHelpers<TeamCreateFormValues>,
  ) => {
    try {
      await onSubmit(values.teamName);
    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 460:
            return formik.setStatus(() =>
              i18n.t('teamCreateForm.error.notAvailable', {
                defaultValue: 'Name "{{teamName}}" is not available',
                teamName: values.teamName,
                ns: 'team-page',
              }),
            );
          case 464:
            return formik.setStatus(() =>
              i18n.t('teamCreateForm.error.alreadyMember', {
                defaultValue: 'You are already a member of another team',
                ns: 'team-page',
              }),
            );
        }

        return formik.setStatus(() =>
          i18n.t('teamCreateForm.error.unknownError', {
            defaultValue: 'Team could not be created due to unknown error',
            ns: 'team-page',
          }),
        );
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
