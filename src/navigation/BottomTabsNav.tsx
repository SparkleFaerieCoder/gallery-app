import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@/screens/Home';

const Tab = createBottomTabNavigator();

export function BottomTabsNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={
        {
          // tabBarStyle: { backgroundColor: colors.$bottomTabBarFill },
          // tabBarActiveTintColor: colors.$bottomTabBarActiveContent,
          // tabBarInactiveTintColor: colors.$topTabBarInactiveContent,
        }
      }
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home1 Example',
          // tabBarIcon: ({ color }) => <Icon name="newspaper" color={color} />,
        }}
      />
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          headerTitle: 'Home2 Example',
          // tabBarIcon: ({ color }) => <Icon name="newspaper" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
