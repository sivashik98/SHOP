import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuScreen } from 'modules/products';

const Stack = createNativeStackNavigator();

export const MenuNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Menu'>
      <Stack.Screen name={'Menu'} component={MenuScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </>
);
