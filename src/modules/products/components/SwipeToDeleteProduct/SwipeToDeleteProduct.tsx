import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors } from 'react-native-ui-lib';

import { UIView } from 'components/UIKit/UIView';

import { SwipeToDeleteProductProps } from 'modules/products/components/SwipeToDeleteProduct/types';
import { SCREEN_WIDTH } from 'src/constants';
import { useBasket } from 'hooks/redux';

export const SwipeToDeleteProduct: FC<SwipeToDeleteProductProps> = ({ productId, productTitle, children }) => {
  const offsetX = useSharedValue(0);
  const POSITION_THRESHOLD = -SCREEN_WIDTH / 3;
  const { handleBasket } = useBasket(productId, productTitle);

  const gesturePan = useMemo(
    () =>
      Gesture.Pan()
        .onChange(({ changeX, translationX }) => {
          if (translationX <= 0) offsetX.value -= -changeX;
          else offsetX.value = 0;
        })
        .onFinalize(({}) => {
          if (offsetX.value < POSITION_THRESHOLD) offsetX.value = withTiming(-SCREEN_WIDTH, {}, (finished) => finished && runOnJS(handleBasket)());
          else offsetX.value = withTiming(0);
        }),
    [POSITION_THRESHOLD, offsetX]
  );

  const itemAnimatedStyles = useAnimatedStyle(() => ({ transform: [{ translateX: offsetX.value }] }));
  const trashAnimatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(offsetX.value, [0, POSITION_THRESHOLD, -SCREEN_WIDTH - 0.1], [0, 1, 0], Extrapolation.CLAMP),
  }));

  return (
    <>
      <GestureDetector gesture={gesturePan}>
        <UIView reanimated flex style={itemAnimatedStyles}>
          {children}
        </UIView>
      </GestureDetector>
      <UIView reanimated centerV right paddingR-30 style={[styles.trashContainer, { backgroundColor: Colors.red70 }, trashAnimatedStyles]}>
        <Feather name='trash-2' size={26} color='white' />
      </UIView>
    </>
  );
};

const styles = StyleSheet.create({
  trashContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
    zIndex: -1,
  },
});
