import i18n from 'i18n';
import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

export interface TeamJoinFormValues {
  teamName: string;
  teamAccessCode: string;
}

export interface TeamJoinProps {
  onSubmit: (teamName: string, teamAccessCode: string) => Promise<void>;
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

  const handleSubmit = async (
    values: TeamJoinFormValues,
    formik: FormikHelpers<TeamJoinFormValues>,
  ) => {
    try {
      await onSubmit(values.teamName, values.teamAccessCode);
    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 404:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.notFound', {
                defaultValue: 'Name "{{teamName}}" was not found',
                teamName: values.teamName,
                ns: 'team-page',
              }),
            );
          case 461:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.invalidCredentials', {
                defaultValue: 'Provided credentials are invalid',
                ns: 'team-page',
              }),
            );
          case 462:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.alreadyMember', {
                defaultValue: 'You are already a member',
                ns: 'team-page',
              }),
            );
          case 464:
            return formik.setStatus(() =>
              i18n.t('teamJoinForm.error.alreadyMemberOfAnotherTeam', {
                defaultValue: 'You are already a member of another team',
                ns: 'team-page',
              }),
            );
        }

        return formik.setStatus(() =>
          i18n.t('teamJoinForm.error.unknownError', {
            defaultValue: 'Team could not be joined due to unknown error',
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
