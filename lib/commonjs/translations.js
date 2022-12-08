"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentLanguage = exports.currentLanguage = exports.Locales = void 0;
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function () {
    return _i18next.default;
  }
});
exports.translationResources = exports.storeLanguage = exports.initStoredLanguage = exports.initLanguages = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = require("react-i18next");
var RNLocalize = _interopRequireWildcard(require("react-native-localize"));
var _en = _interopRequireDefault(require("./en"));
var _fr = _interopRequireDefault(require("./fr"));
var _ptBr = _interopRequireDefault(require("./pt-br"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const translationResources = {
  en: {
    translation: _en.default
  },
  fr: {
    translation: _fr.default
  },
  'pt-BR': {
    translation: _ptBr.default
  }
};
exports.translationResources = translationResources;
let Locales;
exports.Locales = Locales;
(function (Locales) {
  Locales["en"] = "en";
  Locales["fr"] = "fr";
  Locales["ptBr"] = "pt-BR";
})(Locales || (exports.Locales = Locales = {}));
const currentLanguage = _i18next.default.language;

//** Store language into the AsyncStorage  */
exports.currentLanguage = currentLanguage;
const storeLanguage = async id => {
  await _asyncStorage.default.setItem('language', id);
};
exports.storeLanguage = storeLanguage;
const initLanguages = resources => {
  const availableLanguages = Object.keys(resources);
  const bestLanguageMatch = RNLocalize.findBestAvailableLanguage(availableLanguages);
  let translationToUse = 'en';
  if (bestLanguageMatch && availableLanguages.includes(bestLanguageMatch.languageTag)) {
    translationToUse = bestLanguageMatch.languageTag;
  }
  _i18next.default.use(_reactI18next.initReactI18next).init({
    debug: true,
    lng: translationToUse,
    fallbackLng: 'en',
    resources
  });
};

//** Fetch user preference language from the AsyncStorage and set if require  */
exports.initLanguages = initLanguages;
const initStoredLanguage = async () => {
  const langId = await _asyncStorage.default.getItem('language');
  if (langId !== null) {
    if (langId !== currentLanguage) {
      await _i18next.default.changeLanguage(langId);
    }
  }
};
exports.initStoredLanguage = initStoredLanguage;
const getCurrentLanguage = () => {
  return _i18next.default.language;
};
exports.getCurrentLanguage = getCurrentLanguage;
//# sourceMappingURL=translations.js.map