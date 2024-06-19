import React, { FC, useEffect, useRef } from 'react';
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';

import { UIView } from '../UIKit/UIView';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants';
import { SplashProps } from 'components/Splash/types';

export const Splash: FC<SplashProps> = ({ setIsReady }) => {
  const isAnimationEnd = useSharedValue<boolean>(false);
  const animationRef = useRef<LottieView>();
  const source = require('../../../assets/lottie/splash.json');
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: isAnimationEnd.value ? withSpring(10) : 1 }],
    opacity: isAnimationEnd.value ? withTiming(0, {}, () => runOnJS(setIsReady)(true)) : 1,
  }));

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <UIView reanimated center style={[styles.container, animatedStyles]}>
      <LottieView
        ref={animationRef}
        source={source}
        speed={1.2}
        loop={false}
        onAnimationFinish={() => (isAnimationEnd.value = true)}
        style={styles.lottie}
      />
    </UIView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  lottie: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
