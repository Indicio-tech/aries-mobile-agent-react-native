"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _Text = _interopRequireDefault(require("../texts/Text"));
var _Title = _interopRequireDefault(require("../texts/Title"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ContactItem = _ref => {
  let {
    contactRecord,
    strings,
    overrideStyles,
    onPressCallback
  } = _ref;
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const defaultStyles = {
    outerContainer: {
      ...ListItems.contactBackground,
      marginTop: 15,
      marginHorizontal: 15,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: 15
    },
    iconContainer: {
      ...ListItems.contactIconBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15
    },
    contactTitle: ListItems.contactTitle,
    contactDate: ListItems.contactDate,
    contactIcon: {
      color: ListItems.contactIcon.color
    }
  };
  const styles = _reactNative.StyleSheet.create(overrideStyles ?? defaultStyles);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => onPressCallback()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: contactRecord.id,
    style: styles.outerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.textContainer
  }, /*#__PURE__*/_react.default.createElement(_Title.default, {
    style: styles.contactTitle
  }, (contactRecord === null || contactRecord === void 0 ? void 0 : contactRecord.alias) || (contactRecord === null || contactRecord === void 0 ? void 0 : contactRecord.theirLabel)), /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: styles.contactDate
  }, contactRecord.createdAt.toLocaleDateString('en-CA', _constants.dateFormatOptions))), /*#__PURE__*/_react.default.createElement(_Text.default, null, "$", strings.new), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: "message",
    size: 32,
    color: styles.contactIcon.color
  }))));
};
var _default = ContactItem;
exports.default = _default;
//# sourceMappingURL=ContactItem.js.map