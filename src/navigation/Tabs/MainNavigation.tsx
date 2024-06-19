import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SearchProductsScreen, ProductScreen } from 'modules/products';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='SearchProducts' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'SearchProducts'} component={SearchProductsScreen} />
      <Stack.Screen name={'Product'} component={ProductScreen} />
    </Stack.Navigator>
  </>
);
