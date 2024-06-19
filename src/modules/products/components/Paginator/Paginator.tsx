import React, { FC } from 'react';
import { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from 'react-native-ui-lib';

import { UIStack, UIView } from 'components/UIKit';

import { SCREEN_WIDTH } from 'src/constants';
import { PaginatorProps } from 'modules/products/components/Paginator/types';

const SIZE = 10;

export const Paginator: FC<PaginatorProps> = ({ data, scrollOffset }) => {
  return (
    <UIStack reanimated gap={8} row br100 padding-8 backgroundColor={Colors.grey30}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH];
        const animatedStyles = useAnimatedStyle(() => ({
          width: interpolate(scrollOffset.value, inputRange, [SIZE, SIZE * 2, SIZE], Extrapolation.CLAMP),
          opacity: interpolate(scrollOffset.value, inputRange, [0.3, 1, 0.3], Extrapolation.CLAMP),
        }));

        return <UIView key={i} reanimated height={SIZE} br100 backgroundColor={Colors.accent} style={animatedStyles} />;
      })}
    </UIStack>
  );
};
