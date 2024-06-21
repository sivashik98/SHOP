import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreens } from 'src/navigation/commonScreens';

const Stack = createNativeStackNavigator();

export const CatalogNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Categories' screenOptions={{ headerShown: false }}>
      {commonScreens(Stack)}
    </Stack.Navigator>
  </>
);
