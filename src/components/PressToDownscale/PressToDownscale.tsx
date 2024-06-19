import React, { FC } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { UIView } from '../UIKit/UIView';

import { PressToDownscaleProps } from 'components/PressToDownscale/types';

export const PressToDownscale: FC<PressToDownscaleProps> = ({ children, ...props }) => {
  const pressed = useSharedValue<boolean>(false);
  const tap = Gesture.Tap()
    .onBegin(() => (pressed.value = true))
    .onFinalize(() => (pressed.value = false));
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: withTiming(pressed.value ? 0.97 : 1) }] }));

  return (
    <GestureDetector gesture={tap}>
      <UIView reanimated flex style={animatedStyle} {...props}>
        {children}
      </UIView>
    </GestureDetector>
  );
};
