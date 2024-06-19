import React, { FC, useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { UIView } from '../UIKit/UIView';

import { ScaleOnMountPropsType } from 'components/ScaleOnMount/types';

export const ScaleOnMount: FC<ScaleOnMountPropsType> = ({ children, styles, ...props }) => {
  const isMounted = useSharedValue<boolean>(false);

  useEffect(() => {
    isMounted.value = true;
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: isMounted.value ? withTiming(1) : 0.92,
    transform: [{ scale: isMounted.value ? withTiming(1) : 0.8 }],
  }));

  return (
    <UIView reanimated flex style={[animatedStyles, styles]} {...props}>
      {children}
    </UIView>
  );
};
