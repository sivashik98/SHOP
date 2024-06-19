import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native-ui-lib';

import { MainNavigation } from './MainNavigation';
import { CatalogNavigation } from './CatalogNavigation';
import { FavoriteNavigation } from './FavoriteNavigation';
import { BasketNavigation } from './BasketNavigation';
import { MenuNavigation } from './MenuNavigation';

import { BottomBarIcon } from 'components/BottomBarIcon';

const Tabs = createBottomTabNavigator();

export const TabNavigation: FC = () => {
  return (
    <Tabs.Navigator initialRouteName='MainTab' screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name={'MainTab'}
        component={MainNavigation}
        options={{
          tabBarLabel: 'Main',
          tabBarActiveTintColor: Colors.accent,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            fontFamily: 'HelveticaNeueMedium',
          },
          tabBarIcon: ({ focused }) => (
            <BottomBarIcon speed={0.5} focused={focused} source={require(`lottie/bottom-bar/home-icon.json`)} styles={{ width: 35, height: 35 }} />
          ),
        }}
      />
      <Tabs.Screen
        name={'CatalogTab'}
        component={CatalogNavigation}
        options={{
          tabBarLabel: 'Catalog',
          tabBarActiveTintColor: Colors.accent,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            fontFamily: 'HelveticaNeueMedium',
          },
          tabBarIcon: ({ focused }) => (
            <BottomBarIcon speed={0.8} focused={focused} source={require(`lottie/bottom-bar/catalog-icon.json`)} styles={{ width: 34, height: 34 }} />
          ),
        }}
      />
      <Tabs.Screen
        name={'FavoriteTab'}
        component={FavoriteNavigation}
        options={{
          tabBarLabel: 'Favorites',
          tabBarActiveTintColor: Colors.accent,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            fontFamily: 'HelveticaNeueMedium',
          },
          tabBarIcon: ({ focused }) => (
            <BottomBarIcon
              speed={0.5}
              focused={focused}
              source={require(`lottie/bottom-bar/favorite-icon.json`)}
              styles={{ width: 34, height: 34 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={'BasketTab'}
        component={BasketNavigation}
        options={{
          tabBarLabel: 'Cart',
          tabBarActiveTintColor: Colors.accent,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            fontFamily: 'HelveticaNeueMedium',
          },
          tabBarIcon: ({ focused }) => (
            <BottomBarIcon speed={0.8} focused={focused} source={require(`lottie/bottom-bar/basket-icon.json`)} styles={{ width: 30, height: 30 }} />
          ),
        }}
      />
      <Tabs.Screen
        name={'MenuTab'}
        component={MenuNavigation}
        options={{
          tabBarLabel: 'Menu',
          tabBarActiveTintColor: Colors.accent,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            fontFamily: 'HelveticaNeueMedium',
          },
          tabBarIcon: ({ focused }) => (
            <BottomBarIcon focused={focused} source={require(`lottie/bottom-bar/menu-icon.json`)} styles={{ width: 100, height: 100 }} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
