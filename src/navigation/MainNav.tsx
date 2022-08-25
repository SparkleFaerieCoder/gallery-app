import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/screens/Login';
import { RegisterScreen } from '@/screens/Register';
import { CameraScreen } from '@/screens/CameraScreen';

import { BottomTabsNav } from './BottomTabsNav';

const Stack = createNativeStackNavigator();

export function MainNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabsNav} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
        }}
      >
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
