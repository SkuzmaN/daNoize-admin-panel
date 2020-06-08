import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import pl from './pl.json';

const resources = {
  pl: {
    translation: pl
  }
};

export const availableLanguages = Object.keys(resources);

const config: InitOptions = {
  keySeparator: ".",
  interpolation: { escapeValue: false },
  resources,
  whitelist: availableLanguages,
  fallbackLng: "pl",
  detection: {
    order: ["querystring", "localStorage"],
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"],
    lookupLocalStorage: "i18nextLng",
    lookupQuerystring: "lng",
    checkWhitelist: true
  }
};

export const initTranslation = () =>
  i18next
    .use(initReactI18next)
    .init(config)