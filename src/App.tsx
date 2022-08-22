import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { MainNav } from '@/navigation/MainNav';

import { ToggleStorybook } from '../storybook/ToggleStorybook';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToggleStorybook>
        {/* Insert theme/style provider here to surround the app */}
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </ToggleStorybook>
    </SafeAreaView>
  );
}
