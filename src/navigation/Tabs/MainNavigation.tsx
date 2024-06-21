import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SearchProductsScreen } from 'modules/products';
import { commonScreens } from 'src/navigation/commonScreens';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='SearchProducts' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'SearchProducts'} component={SearchProductsScreen} />
      {commonScreens(Stack)}
    </Stack.Navigator>
  </>
);
