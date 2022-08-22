// addons!
import './rn-addons';

import React, { ReactNode } from 'react';

import {
  AppRegistry,
  SafeAreaView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  radios,
  withKnobs,
} from '@storybook/addon-knobs';
import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native';

import { name as appName } from '../app.json';

const colorModeSettings = {
  label: 'Color Mode',
  options: {
    dark: 'dark',
    light: 'light',
  },
  defaultValue: 'light',
  groupId: 'ColorMode',
};

addDecorator(withKnobs);
addDecorator((getStory) => {
  const colorMode = radios(
    colorModeSettings.label,
    colorModeSettings.options,
    colorModeSettings.defaultValue,
    colorModeSettings.groupId
  );

  return <SafeAreaView>{getStory() as ReactNode}</SafeAreaView>;
});

// stories!
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
});

AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
