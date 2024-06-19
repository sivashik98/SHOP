import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BasketScreen, CategoriesScreen, PaymentCongratsScreen, ProductsByCategoryScreen, ProductScreen } from 'modules/products';

const Stack = createNativeStackNavigator();

export const BasketNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Basket' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Basket'} component={BasketScreen} />
      <Stack.Screen name={'Categories'} component={CategoriesScreen} />
      <Stack.Screen name={'ProductsByCategory'} component={ProductsByCategoryScreen} />
      <Stack.Screen name={'Product'} component={ProductScreen} />
      <Stack.Screen name={'PaymentCongrats'} component={PaymentCongratsScreen} options={{ animation: 'fade_from_bottom' }} />
    </Stack.Navigator>
  </>
);
