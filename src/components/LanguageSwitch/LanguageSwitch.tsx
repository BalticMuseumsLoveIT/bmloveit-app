import { CommonLanguageInterface } from 'utils/interfaces';
import { toISO6391 } from 'utils/helpers';
import React from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

export interface LanguageSwitchValues {
  language: string;
}

interface AutoSubmitProps extends LanguageSwitchValues {
  submitForm: (values: LanguageSwitchValues) => Promise<void>;
}

class AutoSubmit extends React.Component<AutoSubmitProps> {
  componentDidUpdate = async (previous: Readonly<LanguageSwitchValues>) => {
    const { language, submitForm } = this.props;
    previous.language !== language &&
      (await submitForm(this.props as LanguageSwitchValues));
  };

  render = () => {
    return null;
  };
}

interface LanguageSwitchProps {
  uiLanguages: Array<CommonLanguageInterface>;
  userLanguage: string | null;
}

export const LanguageSwitch = ({
  uiLanguages,
  userLanguage,
}: LanguageSwitchProps) => {
  const { t, i18n, ready } = useTranslation('language-page');

  const initialValues: LanguageSwitchValues = { language: '' };

  const validationSchema = Yup.object().shape({
    language: Yup.string().required(
      t(
        'validationSchema.language.required',
        'Please choose your preferred language',
      ),
    ),
  });

  const onSubmit = async (values: LanguageSwitchValues) => {
    await i18n.changeLanguage(values.language);
  };

  let userLocaleMatch = false;

  if (userLanguage !== null) {
    userLanguage = toISO6391(userLanguage);

    uiLanguages.some(({ key: uiLanguage }) => {
      uiLanguage = toISO6391(uiLanguage);

      if (uiLanguage === userLanguage) {
        initialValues.language = userLanguage;
        userLocaleMatch = true;
        return true;
      }

      return false;
    });
  }

  if (!ready) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, values }) => (
        <Form>
          <div>
            <label htmlFor="language">
              {t('form.field.language.label', 'Choose a language')}
            </label>
            <Field as="select" name="language" id="language">
              <option value="" hidden={userLocaleMatch} />
              {uiLanguages.map(language => (
                <option key={language.id} value={language.key}>
                  {language.value}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="language" component="div" />
          <div>
            <AutoSubmit {...values} submitForm={submitForm} />
          </div>
        </Form>
      )}
    </Formik>
  );
};
