import React, { ReactElement } from 'react';
import { Button as RNButton, ButtonProps } from 'react-native';

/**
 * A simple button that
 * opens opportunity to replace with a styled button later
 */

export const Button = ({ ...props }: ButtonProps): ReactElement => {
  return <RNButton {...props} />;
};
