import type { ConnectionRecord } from '@aries-framework/core';
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
interface BaseProps {
    overrideStyles: ContactItemStyles | undefined;
}
interface ContactItemProps extends BaseProps {
    contactRecord: ConnectionRecord;
    onPressCallback: () => void;
    strings: ContactItemStrings;
}
interface ContactItemStrings {
    new: string;
}
interface ContactItemStyles {
    outerContainer: ViewStyle;
    textContainer: ViewStyle;
    iconContainer: ViewStyle;
    contactTitle: TextStyle;
    contactDate: TextStyle;
    contactIcon: {
        color: string;
    };
}
declare const ContactItem: React.FC<ContactItemProps>;
export default ContactItem;
//# sourceMappingURL=ContactItem.d.ts.map