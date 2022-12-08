import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './en';
import fr from './fr';
import ptBr from './pt-br';
export const translationResources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  },
  'pt-BR': {
    translation: ptBr
  }
};
export let Locales;
(function (Locales) {
  Locales["en"] = "en";
  Locales["fr"] = "fr";
  Locales["ptBr"] = "pt-BR";
})(Locales || (Locales = {}));
const currentLanguage = i18n.language;

//** Store language into the AsyncStorage  */
const storeLanguage = async id => {
  await AsyncStorage.setItem('language', id);
};
const initLanguages = resources => {
  const availableLanguages = Object.keys(resources);
  const bestLanguageMatch = RNLocalize.findBestAvailableLanguage(availableLanguages);
  let translationToUse = 'en';
  if (bestLanguageMatch && availableLanguages.includes(bestLanguageMatch.languageTag)) {
    translationToUse = bestLanguageMatch.languageTag;
  }
  i18n.use(initReactI18next).init({
    debug: true,
    lng: translationToUse,
    fallbackLng: 'en',
    resources
  });
};

//** Fetch user preference language from the AsyncStorage and set if require  */
const initStoredLanguage = async () => {
  const langId = await AsyncStorage.getItem('language');
  if (langId !== null) {
    if (langId !== currentLanguage) {
      await i18n.changeLanguage(langId);
    }
  }
};
const getCurrentLanguage = () => {
  return i18n.language;
};
export { i18n, initStoredLanguage, initLanguages, storeLanguage, currentLanguage, getCurrentLanguage };
//# sourceMappingURL=translations.js.map