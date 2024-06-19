import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoriesScreen, ProductsByCategoryScreen, ProductScreen } from 'modules/products';

const Stack = createNativeStackNavigator();

export const CatalogNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Categories' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Categories'} component={CategoriesScreen} />
      <Stack.Screen name={'ProductsByCategory'} component={ProductsByCategoryScreen} />
      <Stack.Screen name={'Product'} component={ProductScreen} />
    </Stack.Navigator>
  </>
);
