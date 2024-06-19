import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { FavoritesList } from 'modules/products/containers/FavoritesList';

export const FavoritesScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <BlurView style={[styles.blurView, { height: top }]} />
      <FavoritesList />
    </>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: '#181818',
    shadowOffset: { height: 1, width: 0 },
  },
});
