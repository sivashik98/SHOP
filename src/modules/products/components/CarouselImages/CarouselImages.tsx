import React, { memo } from 'react';
import Animated, { ReanimatedEvent, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Colors, Spacings } from 'react-native-ui-lib';
import { StyleSheet, NativeScrollEvent } from 'react-native';
import { Image } from 'expo-image';

import { SCREEN_WIDTH } from 'src/constants';
import { CarouselImagesProps } from 'modules/products/components/CarouselImages/types';

const renderItem = ({ item }) => <Image source={item} style={[styles.image, { backgroundColor: Colors.grey30 }]} />;

const keyExtractor = (_, index) => index;

export const CarouselImages: memo<CarouselImagesProps> = memo(({ data, scrollOffset }) => {
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }: ReanimatedEvent<NativeScrollEvent>) => (scrollOffset.value = x),
  });

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
    />
  );
});

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 40,
    borderRadius: 12,
    marginHorizontal: Spacings.s5,
  },
});
