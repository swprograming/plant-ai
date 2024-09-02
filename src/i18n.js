import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./locales/en/translation.json'),
      },
      am: {
        translation: require('./locales/amh/translation.json'),
      },
    },
    lng: localStorage.getItem('language') || 'en', // Load language from localStorage or use default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
