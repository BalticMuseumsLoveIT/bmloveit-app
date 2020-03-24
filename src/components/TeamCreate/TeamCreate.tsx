import i18n from 'i18n';
import TextInput, {
  InputError,
} from 'components/Form/TextInput/TextInput.style';
import Form, { InputContainer } from 'components/Form/Form.style';
import Label from 'components/Form/Label/Label.style';
import { AppButton } from 'components/Buttons/AppButton.style';
import { Title } from 'components/Page/Page.style';
import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';

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
          <Title>{t('content.title.createTeam', 'Create group')}</Title>
          <InputContainer>
            <Label htmlFor="teamName">{t('form.teamName.label', 'Name')}</Label>
            <TextInput
              name="teamName"
              type="text"
              placeholder={t('form.teamName.placeholder', 'Name')}
            />
            <ErrorMessage component={InputError} name="teamName" />
          </InputContainer>
          <div>
            {status && <InputError isCentered={true}>{status()}</InputError>}
            <AppButton type="submit" isThin={true}>
              {t('form.button.create.text', 'Create')}
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
