"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BifoldContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const BifoldContext = /*#__PURE__*/(0, _react.createContext)({});
exports.BifoldContext = BifoldContext;
const BifoldProvider = _ref => {
  let {
    children
  } = _ref;
  (0, _react.useEffect)(() => {
    _i18next.default.use(_reactI18next.initReactI18next).init({
      debug: true,
      lng: 'en',
      fallbackLng: 'en',
      resources: {}
    });
    console.log(_i18next.default.isInitialized);
  }, []);
  return /*#__PURE__*/_react.default.createElement(BifoldContext.Provider, {
    value: {}
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children));
};
var _default = BifoldProvider;
exports.default = _default;
//# sourceMappingURL=index.js.map