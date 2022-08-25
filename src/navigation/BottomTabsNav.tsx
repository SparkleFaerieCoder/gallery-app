import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { Icon } from '@rneui/base';

import { ProfileScreen } from '@/screens/Profile';
import { CameraScreen } from '@/screens/CameraScreen';
import { GalleryScreen } from '@/screens/Gallery';
import { Container } from '@/components/Container';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CameraBase = () => <View style={{ flex: 1, backgroundColor: 'transparent' }} />;

const CameraModalButton = () => (
  <Container position="relative" bottom={15}>
    <Icon name="add" size={36} reverse />
  </Container>
);

const TabIcon = (iconName: string, color: string) => (
  <Container>
    <Icon type="ionicon" name={iconName} size={28} color={color} />
  </Container>
);

export function BottomTabsNav() {
  return (
    <Tab.Navigator
      initialRouteName="Gallery"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => TabIcon('person', color),
        }}
      />

      <Tab.Screen
        name="CameraBase"
        component={CameraBase}
        options={{
          tabBarIcon: CameraModalButton,
          tabBarLabel: '',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Camera');
          },
        })}
      />

      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          tabBarIcon: ({ color }) => TabIcon('images', color),
        }}
      />
    </Tab.Navigator>
  );
}
