import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';

i18n
  .use(XHR)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .then();

export default i18n;
