import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

import { UIView } from 'components/UIKit';

import { ListFooterLoaderProps } from 'modules/products/components/ListFooterLoader/types';

export const ListFooterLoader: FC<ListFooterLoaderProps> = ({ shouldShow }) => {
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(shouldShow ? 1 : 0, { duration: 500 }),
  }));

  return (
    <UIView reanimated center style={animatedStyles}>
      <LottieView source={require('lottie/loader.json')} loop autoPlay style={styles.lottie} />
    </UIView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 90,
    height: 90,
    margin: 10,
  },
});
