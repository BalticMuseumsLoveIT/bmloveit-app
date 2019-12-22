import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import languageDetector from 'i18next-browser-languagedetector';

i18n
  .use(languageDetector)
  .use(XHR)
  .use(initReactI18next)
  .init({
    debug: true,

    ns: ['app'],
    defaultNS: 'app',

    fallbackLng: 'en',

    // Try using fallback language if value is empty
    returnEmptyString: false,

    react: {
      useSuspense: false,
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    // Use only 2 letter language code as directory name
    // This setting also force props.i18n.language to return 2 letter code
    load: 'languageOnly',

    detection: {
      // order and from where user language should be detected
      order: ['localStorage', 'navigator'],

      // keys or params to lookup language from
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: false,
      lookupCookie: false,
      lookupFromPathIndex: false,
      lookupFromSubdomainIndex: false,

      // cache user language on
      caches: ['localStorage'],
    },
  })
  .then();
