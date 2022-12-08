import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { dateFormatOptions } from '../../constants';
import { useTheme } from '../../contexts/theme';
import Text from '../texts/Text';
import Title from '../texts/Title';
import { useTranslation } from 'react-i18next';
const ContactItem = _ref => {
  let {
    contactRecord,
    strings,
    overrideStyles,
    onPressCallback
  } = _ref;
  const {
    ListItems
  } = useTheme();
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
  const styles = StyleSheet.create(overrideStyles ?? defaultStyles);
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => onPressCallback()
  }, /*#__PURE__*/React.createElement(View, {
    key: contactRecord.id,
    style: styles.outerContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer
  }, /*#__PURE__*/React.createElement(Title, {
    style: styles.contactTitle
  }, (contactRecord === null || contactRecord === void 0 ? void 0 : contactRecord.alias) || (contactRecord === null || contactRecord === void 0 ? void 0 : contactRecord.theirLabel)), /*#__PURE__*/React.createElement(Text, {
    style: styles.contactDate
  }, contactRecord.createdAt.toLocaleDateString('en-CA', dateFormatOptions))), /*#__PURE__*/React.createElement(Text, null, "$", strings.new), /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message",
    size: 32,
    color: styles.contactIcon.color
  }))));
};
export default ContactItem;
//# sourceMappingURL=ContactItem.js.map