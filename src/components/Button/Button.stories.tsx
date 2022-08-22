import { storiesOf } from '@storybook/react-native';
import React from 'react';

import { Button } from './Button';

storiesOf('components/Button', module).add('Default', () => (
  <Button title="Tap Me" onPress={() => console.log('tapped')} />
));
