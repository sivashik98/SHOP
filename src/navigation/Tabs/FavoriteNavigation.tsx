import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FavoritesScreen } from 'modules/products';
import { commonScreens } from 'src/navigation/commonScreens';

const Stack = createNativeStackNavigator();

export const FavoriteNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Favorites' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Favorites'} component={FavoritesScreen} />
      {commonScreens(Stack)}
    </Stack.Navigator>
  </>
);
