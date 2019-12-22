import { CommonLanguageInterface } from 'utils/interfaces';
import React from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';

export interface LanguageSwitchValues {
  language: string;
}

interface LanguageSwitchProps {
  list: Array<CommonLanguageInterface>;
  userLocale: string;
  onSubmit: (values: FormikValues) => Promise<void>;
}

export const LanguageSwitch = ({
  list,
  userLocale,
  onSubmit,
}: LanguageSwitchProps) => {
  const { t, ready } = useTranslation('language-page');

  const initialValues: LanguageSwitchValues = { language: '' };
  let userLocaleMatch = false;

  const validationSchema = Yup.object().shape({
    language: Yup.string().required(
      t(
        'validationSchema.language.required',
        'Please choose your preferred language',
      ),
    ),
  });

  list.some(
    language =>
      // some() will brake loop after first matched element
      language.key === userLocale &&
      // Set initial value based on user locale
      (initialValues.language = userLocale) &&
      (userLocaleMatch = true),
  );

  // Render only when locales are available
  if (!ready) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form>
          <div>
            <label htmlFor="language">
              {t('form.field.language.label', 'Choose a language')}
            </label>
            <Field as="select" name="language" id="language">
              <option value="" hidden={userLocaleMatch} />
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
              {t('form.button.submit.label', 'Next')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
