// adapated from: https://github.com/infinitered/ignite/blob/master/boilerplate/storybook/toggle-storybook.tsx
import React, { ComponentType, ReactElement, useState, useEffect } from 'react';
import { DevSettings } from 'react-native';
import { loadString, saveString } from '../src/utils/storage';
import { isDev } from '../src/utils/stage';

const STORAGE_KEY = 'devStorybook';

// only require storybook if we are in __DEV__ mode
const Storybook: ComponentType = isDev() ? require('./storybook').default : () => null;

type ToggleStorybookProps = {
  children: ReactElement;
};

/**
 * Toggle Storybook mode, in __DEV__ mode only.
 *
 * In non-__DEV__ mode, or when Storybook isn't toggled on,
 * renders its children.
 *
 * The mode flag is persisted in async storage, which means it
 * persists across reloads/restarts - this is handy when developing
 * new components in Storybook.
 */
export function ToggleStorybook({ children }: ToggleStorybookProps) {
  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    if (!isDev()) {
      return;
    }

    const addMenu = async () => {
      const storedSetting = await loadString(STORAGE_KEY);
      setShowStorybook(storedSetting === 'on');

      if (DevSettings) {
        // Add our toggle command to the menu
        DevSettings.addMenuItem('Toggle Storybook', () => {
          setShowStorybook((show) => {
            show = !show;

            saveString(STORAGE_KEY, show ? 'on' : 'off');

            // Return it to change the local state
            return show;
          });
        });
      }
    };

    addMenu();
  }, []);

  if (showStorybook) {
    return Storybook ? <Storybook /> : null;
  } else {
    return children;
  }
}
