import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';

// ROOT
import { TabNavigation } from './Tabs';

const RootStack = createNativeStackNavigator();

const NavigationFlow = () => (
  <>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.grey100} />

    <RootStack.Navigator initialRouteName='App' screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={'App'} component={TabNavigation} />
    </RootStack.Navigator>
  </>
);

export const RootNavigation = () => {
  const navigationContainerRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <NavigationFlow />
    </NavigationContainer>
  );
};
