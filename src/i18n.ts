import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ruTranslation from "./locales/ru.json";
import enTranslation from "./locales/en.json";

const resources = {
  ru: {
    translation: ruTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
