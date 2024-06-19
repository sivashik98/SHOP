import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState, StrictMode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useDispatch } from 'react-redux';

import { Splash } from 'components/Splash';
import { RootNavigation } from 'src/navigation/Root';

import { store } from 'src/store/store';
import { addManyFavorites } from 'src/store/slices/favoritesSlice';
import { addManyToBasket } from 'src/store/slices/basketSlice';
import { initUiTheme } from 'components/UIKit/utils';

initUiTheme();

const InnerApp = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      const basket = await AsyncStorage.getItem('basket');
      if (!favorites) await AsyncStorage.setItem('favorites', JSON.stringify([]));
      else dispatch(addManyFavorites(JSON.parse(favorites)));
      if (!basket) await AsyncStorage.setItem('basket', JSON.stringify([]));
      else dispatch(addManyToBasket(JSON.parse(basket)));
    };
    run();
  }, []);

  if (!isReady) return <Splash setIsReady={setIsReady} />;

  return <RootNavigation />;
};

export default function App() {
  return (
    // <StrictMode>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <InnerApp />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    // </StrictMode>
  );
}
