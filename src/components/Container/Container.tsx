import React, { ReactElement } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export type ContainerProps = ViewStyle & ViewProps;

export const Container = ({ children, ...props }: ContainerProps): ReactElement => (
  <View {...props}>{children}</View>
);
