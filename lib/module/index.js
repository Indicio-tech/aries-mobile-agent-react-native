import React, { createContext, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
export const BifoldContext = /*#__PURE__*/createContext({});
const BifoldProvider = _ref => {
  let {
    children
  } = _ref;
  useEffect(() => {
    i18next.use(initReactI18next).init({
      debug: true,
      lng: 'en',
      fallbackLng: 'en',
      resources: {}
    });
    console.log(i18next.isInitialized);
  }, []);
  return /*#__PURE__*/React.createElement(BifoldContext.Provider, {
    value: {}
  }, /*#__PURE__*/React.createElement(React.Fragment, null, children));
};
export default BifoldProvider;
//# sourceMappingURL=index.js.map