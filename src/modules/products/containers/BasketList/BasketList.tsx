import React, { useState, FC, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Colors, Spacings } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import compact from 'lodash/compact';
import map from 'lodash/map';
import find from 'lodash/find';
import { useNavigation } from '@react-navigation/native';

import { UIButton, UIStack, UIText, UIView } from 'components/UIKit';
import { FetchToOpacity } from 'components/FetchToOpacity';
import { BasketListSkeleton } from 'modules/products/components/skeletons/BasketListSkeleton';
import { BasketCard } from 'modules/products/components/BasketCard';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useGetAllProductsQuery } from 'src/api/api';
import { Product } from 'src/api/types';
import { SCREEN_WIDTH } from 'src/constants';
import { BasketListProps } from 'modules/products/containers/BasketList/types';
import { uiScreenPaddings } from 'components/UIKit/styles';
import { removeAllFromBasket } from 'src/store/slices/basketSlice';

const ListEmptyComponent = () => {
  const { navigate } = useNavigation();
  return (
    <UIView flex center>
      <UIText h2 color={Colors.grey80}>
        Add your{' '}
        <UIText onPress={() => navigate('Categories')} h2 color={Colors.accent}>
          First Product!
        </UIText>
      </UIText>
      <LottieView loop autoPlay source={require('lottie/empty-basket.json')} style={styles.listEmptyComponentLottie} />
    </UIView>
  );
};

const renderItem = ({ item }) => (
  <UIView key={item.id} marginB-20>
    <BasketCard item={item} />
  </UIView>
);

const keyExtractor = (item: Product) => item?.id;

export const BasketList: FC<BasketListProps> = ({}) => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error }: { data: Product[] } = useGetAllProductsQuery({});
  const { isLoading: isBasketLoading, basket } = useAppSelector((state) => state.basketReducer);
  const [items, setItems] = useState<Product[] | []>([]);
  const totalPrice = items.reduce((acc: number, el: Product) => (acc += el.price), 0);

  useEffect(() => {
    if (!isBasketLoading && !isLoading) setItems(compact(map(basket, (id) => find(data, { id }))));
  }, [basket, isBasketLoading, data, isLoading]);

  const handlePressPay = () => {
    navigate('PaymentCongrats');
    dispatch(removeAllFromBasket());
  };

  if (isLoading) return <BasketListSkeleton />;

  if (isError) return <UIText>{JSON.stringify(error)}</UIText>;

  return (
    <FetchToOpacity isFetching={isBasketLoading}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={isLoading ? null : <ListEmptyComponent />}
        style={{ paddingTop: top, backgroundColor: Colors.white }}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
      {items.length > 0 ? (
        <UIStack gap={20} row spread absB absR absL style={uiScreenPaddings}>
          <UIButton flex title={`Pay $${totalPrice}`} loading={isBasketLoading} onPress={handlePressPay} />
        </UIStack>
      ) : null}
    </FetchToOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    ...uiScreenPaddings,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    columnGap: 12,
    marginVertical: 30,
    paddingHorizontal: Spacings.s5,
  },
  listEmptyComponentLottie: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  heart: {
    position: 'absolute',
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
    zIndex: -1,
    opacity: 0.1,
  },
});
