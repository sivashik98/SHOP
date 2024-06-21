import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BasketScreen, PaymentCongratsScreen } from 'modules/products';
import { commonScreens } from 'src/navigation/commonScreens';

const Stack = createNativeStackNavigator();

export const BasketNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Basket' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Basket'} component={BasketScreen} />
      {commonScreens(Stack)}
      <Stack.Screen name={'PaymentCongrats'} component={PaymentCongratsScreen} options={{ animation: 'fade_from_bottom' }} />
    </Stack.Navigator>
  </>
);
