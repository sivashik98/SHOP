import React, { useEffect, useState, useCallback, FC } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Colors } from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';

import { UIView } from 'components/UIKit';
import { ProductCard } from 'modules/products/components/ProductCard';
import { ProductsListSkeleton } from 'modules/products/components/skeletons/ProductsListSkeleton';
import { ListFooterLoader } from 'modules/products/components/ListFooterLoader';
import { FetchToOpacity } from 'components/FetchToOpacity';

import { useLazyGetProductsByCategoryQuery } from 'src/api/api';
import { ProductsByCategoryListProps } from 'modules/products/containers/ProductsByCategoryList/types';
import { isHotCategory } from 'modules/products/utils';
import { Product } from 'src/api/types';

const renderItem = ({ item }: Product) => <ProductCard item={item} />;

const keyExtractor = (item: Product) => item?.id;

const LIMIT = 10;

export const ProductsByCategoryList: FC<ProductsByCategoryListProps> = ({ category }) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [dataIsOver, setDataIsOver] = useState<boolean>(false);
  const [items, setItems] = useState<Product[] | []>([]);
  const [get, { isLoading, isFetching }] = useLazyGetProductsByCategoryQuery({ category });

  const getItems = useCallback(
    async (offset: number) => {
      const { data, isSuccess, error, isError } = (await get({ category, limit: LIMIT, skip: offset })) || {};
      if (isSuccess) {
        if (data.skip > data.total) setDataIsOver(true);
        else {
          setDataIsOver(false);
          setItems((prevData) => (offset > 0 ? [...prevData, ...data.products] : data.products));
        }
      }
      if (isError) alert(error.data.message);
    },
    [get, category]
  );

  useEffect(() => {
    getItems(0);
  }, []);

  const getMoreItems = useCallback(async () => {
    if (isFetching || dataIsOver) return;
    setPage((prevState) => prevState + LIMIT);
    await getItems(page + LIMIT);
  }, [isFetching, page, getItems, dataIsOver]);
  const refresh = useCallback(async () => {
    setPage(0);
    setIsRefreshing(true);
    await getItems(0);
    setIsRefreshing(false);
  }, [getItems]);

  if (isLoading) return <ProductsListSkeleton />;

  return (
    <FetchToOpacity isFetching={isRefreshing}>
      <UIView flex backgroundColor={isHotCategory(category) ? Colors.red10 : Colors.white}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
          onEndReachedThreshold={0.1}
          onEndReached={getMoreItems}
          ListFooterComponent={items.length > 0 && !dataIsOver ? <ListFooterLoader shouldShow={isFetching} /> : undefined}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          showsVerticalScrollIndicator={false}
        />
        {isHotCategory(category) ? <LottieView autoPlay loop speed={0.6} source={require('lottie/sale.json')} style={styles.lottie} /> : null}
      </UIView>
    </FetchToOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    columnGap: 15,
    padding: 5,
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  lottie: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: -1,
  },
});
