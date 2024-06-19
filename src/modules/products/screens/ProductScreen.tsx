import React, { useCallback, useMemo, useState } from 'react';
import { NativeScrollEvent, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { ReanimatedEvent, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Colors } from 'react-native-ui-lib';

import { UIButton, UIStack, UIText, UIView } from 'components/UIKit';
import { Paginator } from 'modules/products/components/Paginator';
import { CarouselImages } from 'modules/products/components/CarouselImages';
import { CarouselReviews } from 'modules/products/components/CarouselReviews';
import { FavoriteButton } from 'modules/products/components/FavoriteButton';
import { FetchToOpacity } from 'components/FetchToOpacity';
import { ProductSkeleton } from 'modules/products/components/skeletons/ProductSkeleton';
import { AnimatedHeader } from 'modules/products/components/AnimatedHeader';

import { useBasket, useLikeProduct } from 'hooks/redux';
import { useGetProductByIdQuery } from 'src/api/api';
import { uiScreenPaddings } from 'components/UIKit/styles';
import { FAKE_IMAGES, isIOS, RATING_SOURCES, SCREEN_HEIGHT } from 'src/constants';
import { Product } from 'src/api/types';
import { isPremiumProduct } from 'modules/products/utils';

export const ProductScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { id } = useRoute()?.params;
  const { top } = useSafeAreaInsets();
  const { data, isLoading, isFetching, isError, error, refetch }: { data: Product } = useGetProductByIdQuery({ id });
  const imageScrollOffset = useSharedValue<number>(0);
  const outsideScrollOffset = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }: ReanimatedEvent<NativeScrollEvent>) => (outsideScrollOffset.value = y),
  });
  const { isLiked, handleLike, isLoadingFavorites } = useLikeProduct(id, '');
  const { handleBasket, isInBasked, isLoadingBasket } = useBasket(id, '');
  const ratingSource = useMemo(() => (data ? RATING_SOURCES[Math.round(data.rating) - 1] : ''), [data]);
  const backgroundColor = useMemo(() => (data && isPremiumProduct(data.rating) ? Colors.yellow10 : Colors.white), [data]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    refetch({ id });
    setIsRefreshing(false);
  }, [refetch]);

  if (isLoading) return <ProductSkeleton />;

  if (isError) return <UIText>{JSON.stringify(error)}</UIText>;

  return (
    <FetchToOpacity isFetching={isFetching || isLoadingFavorites || isLoadingBasket}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
        style={{ backgroundColor }}
        contentContainerStyle={{ paddingTop: isIOS ? top : 40, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {isPremiumProduct(data.rating) ? (
          <>
            <LottieView speed={1} loop autoPlay source={require('lottie/flickering-stars.json')} style={[styles.lottieStars, { top: -top }]} />
            <LottieView speed={0.5} loop autoPlay source={require('lottie/flickering-stars-small.json')} style={styles.lottieStarsFlash} />
          </>
        ) : null}

        <UIStack gap={15} center>
          <CarouselImages data={[...data.images, ...FAKE_IMAGES]} scrollOffset={imageScrollOffset} />
          <Paginator data={[...data.images, ...FAKE_IMAGES]} scrollOffset={imageScrollOffset} />
        </UIStack>

        <UIView style={uiScreenPaddings}>
          <LottieView autoPlay loop={false} source={ratingSource} style={styles.lottieRating} />
          <UIText h1 numberOfLines={1} marginR-120>
            {data.title}
          </UIText>
          <UIView marginT-10 centerV row spread>
            <UIText bodyM2 color={Colors.grey80}>
              {data.brand}
            </UIText>
            <UIText bodyM3>{data.rating}</UIText>
          </UIView>
          <UIView marginT-10 centerV row>
            <UIText h1>$ {data.price}</UIText>
            <UIText bodyM2 color={Colors.grey80} marginL-10>
              (discount {data.discountPercentage} %)
            </UIText>
          </UIView>
        </UIView>

        <UIView marginT-20>
          <CarouselReviews data={data.reviews} itemStyles={{ backgroundColor }} />
        </UIView>

        <UIStack gap={15} marginT-20 style={uiScreenPaddings}>
          <UIText h1>About</UIText>
          <UIText bodyM2 color={Colors.grey80}>
            {data.description}
          </UIText>
          <UIText bodyM2 color={Colors.grey80}>
            {data.description}
          </UIText>
          <UIText bodyM2 color={Colors.grey80}>
            {data.description}
          </UIText>
        </UIStack>
      </Animated.ScrollView>

      <AnimatedHeader title={data.title} styles={{ backgroundColor }} scrollOffset={outsideScrollOffset} />
      <UIStack gap={20} row spread absB absR absL style={uiScreenPaddings}>
        <UIButton flex title={isInBasked ? 'Remove from cart' : 'Add to cart'} loading={isFetching || isLoadingBasket} onPress={handleBasket} />
        <FavoriteButton loading={isFetching || isLoadingFavorites} isLiked={isLiked} onPress={handleLike} styles={{ backgroundColor }} />
      </UIStack>
    </FetchToOpacity>
  );
};

const styles = StyleSheet.create({
  lottieRating: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: -67,
    right: -24,
    zIndex: 1,
  },
  lottieStars: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    zIndex: -1,
  },
  lottieStarsFlash: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 4,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
});
