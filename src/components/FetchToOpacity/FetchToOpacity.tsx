import React, { FC, useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { UIView } from '../UIKit/UIView';

import { FetchToOpacityProps } from 'components/FetchToOpacity/types';
import { isAndroid } from 'src/constants';

export const FetchToOpacity: FC<FetchToOpacityProps> = ({ isFetching, children }) => {
  if (isAndroid) return children;
  const opacity = useSharedValue<number>(0.4);

  useEffect(() => {
    opacity.value = isFetching ? 0.5 : 1;
  }, [isFetching]);

  const animatedStyles = useAnimatedStyle(() => ({ opacity: withTiming(opacity.value) }));

  return (
    <UIView reanimated flex style={animatedStyles}>
      {children}
    </UIView>
  );
};
