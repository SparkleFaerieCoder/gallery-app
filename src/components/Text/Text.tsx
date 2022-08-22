import { ReactElement } from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

/**
 * A simple text element that
 * opens opportunity to replace with a styled button later
 */

type TextProps = TextStyle & RNTextProps;

export const Text = ({ children, ...props }: TextProps): ReactElement => {
  return <RNText {...props}>{children}</RNText>;
};
