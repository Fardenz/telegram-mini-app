import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import es from "../i18n/es.json"
import en from "../i18n/en.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: es,
      },
      en: {
        translation: en,
      },
    },
  })
