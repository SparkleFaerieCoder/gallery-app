import React from 'react';
import { StatusBar } from 'react-native';

import { Container, ContainerProps } from '@/components/Container';

interface ScreenProps {
  /** Whether to force the topInset. Use to prevent screen jank on tab screens */
  forceTopInset?: boolean;
}

type ComponentProps = ScreenProps & ContainerProps;

export const Screen = ({
  paddingTop,
  paddingBottom,
  // forceTopInset,
  children,
  ...props
}: ComponentProps) => {
  return (
    <>
      <StatusBar />
      <Container flex={1} width="100%">
        <Container flex={1} paddingTop={paddingTop} paddingBottom={paddingBottom}>
          <Container flex={1} {...props}>
            {children}
          </Container>
        </Container>
      </Container>
    </>
  );
};
