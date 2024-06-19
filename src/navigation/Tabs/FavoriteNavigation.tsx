import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoriesScreen, ProductsByCategoryScreen, ProductScreen, FavoritesScreen } from 'modules/products';

const Stack = createNativeStackNavigator();

export const FavoriteNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Favorites' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Favorites'} component={FavoritesScreen} />
      <Stack.Screen name={'Categories'} component={CategoriesScreen} />
      <Stack.Screen name={'ProductsByCategory'} component={ProductsByCategoryScreen} />
      <Stack.Screen name={'Product'} component={ProductScreen} />
    </Stack.Navigator>
  </>
);
