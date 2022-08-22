import { storiesOf } from '@storybook/react-native';
import React from 'react';

import { Text } from '@/components/Text';

import { Screen } from './Screen';

storiesOf('components/Screen', module).add('Default', () => (
  <Screen>
    <Text>Content wrapped in a screen</Text>
  </Screen>
));
