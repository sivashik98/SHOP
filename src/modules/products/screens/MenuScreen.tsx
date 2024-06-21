import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { UIView } from 'components/UIKit';
import { Colors } from 'react-native-ui-lib';

import { SCREEN_WIDTH } from 'src/constants';

export const MenuScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <BlurView style={[styles.blurView, { height: top }]} />
      <UIView absF center backgroundColor={Colors.white}>
        <LottieView autoPlay loop source={require('lottie/avatar.json')} style={styles.lottie} />
      </UIView>
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
  lottie: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
});
