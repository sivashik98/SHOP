import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';

import { UIText, UIView } from 'components/UIKit';

const Stack = createNativeStackNavigator();

const MenuScreen = () => (
  <UIView flex backgroundColor={'pink'} center>
    <UIText h2 color={Colors.grey70}>
      Menu
    </UIText>
  </UIView>
);

export const MenuNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Menu'>
      <Stack.Screen name={'Menu'} component={MenuScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </>
);
