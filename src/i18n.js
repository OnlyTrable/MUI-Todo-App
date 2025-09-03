import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationUK from "./components/locales/uk/translation.json";
import translationRU from "./components/locales/ru/translation.json";
import translationEN from "./components/locales/en/translation.json";
import translationDE from "./components/locales/de/translation.json";

// Імпортуємо локалі для dayjs
import "dayjs/locale/uk";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import "dayjs/locale/de";

const resources = {
  uk: {
    translation: translationUK,
  },
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  .use(LanguageDetector) // Виявляє мову користувача
  .use(initReactI18next) // Інтегрує i18next з React
  .init({
    resources,
    fallbackLng: "uk", // Мова за замовчуванням
    interpolation: {
      escapeValue: false, // React вже захищає від XSS
    },
  });

export default i18n;
