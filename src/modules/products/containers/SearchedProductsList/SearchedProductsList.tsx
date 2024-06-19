import React, { useEffect, useState, useCallback, FC, useMemo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Colors, Spacings } from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

import { UIText, UITextField, UIView } from 'components/UIKit';
import { ProductCard } from 'modules/products/components/ProductCard';
import { ListFooterLoader } from 'modules/products/components/ListFooterLoader';
import { ProductsListSkeleton } from 'modules/products/components/skeletons/ProductsListSkeleton';
import { FetchToOpacity } from 'components/FetchToOpacity';
import LogoSVG from 'svg/LogoSVG';

import { useLazyGetSearchedProductsQuery } from 'src/api/api';
import { uiScreenPaddings } from 'components/UIKit/styles';
import { isIOS, SCREEN_WIDTH } from 'src/constants';
import { SearchedProductsListProps } from 'modules/products/containers/SearchedProductsList/types';
import useDebounce from 'hooks/useDebounce';
import { Product } from 'api/types';

const ListEmptyComponent = ({ searchValue }) => (
  <UIView flex center>
    <UIText bodyR2 center>
      По запросу <UIText bodyB2>{searchValue}</UIText> ничего не найдено
    </UIText>
    <LottieView loop autoPlay source={require('lottie/empty-search.json')} style={styles.listEmptyComponentLottie} />
  </UIView>
);

const renderItem = ({ item }: Product) => <ProductCard item={item} />;

const keyExtractor = (item: Product) => item?.id;

const LIMIT = 12;

export const SearchedProductsList: FC<SearchedProductsListProps> = ({}) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [dataIsOver, setDataIsOver] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [items, setItems] = useState<Product[] | []>([]);
  const [get, { isLoading, isFetching }] = useLazyGetSearchedProductsQuery();
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { top } = useSafeAreaInsets();

  const getItems = useCallback(
    async (offset: number, search: string = '') => {
      const { data, isSuccess, error, isError } = (await get({ limit: LIMIT, skip: offset, q: search })) || {};
      if (isSuccess) {
        if (data.skip > data.total) setDataIsOver(true);
        else {
          setDataIsOver(false);
          setItems((prevData) => (offset > 0 ? [...prevData, ...data.products] : data.products));
        }
        setIsFiltering(false);
      }
      if (isError) alert(error.data.message);
    },
    [get]
  );

  useEffect(() => {
    getItems(0);
  }, []);
  useEffect(() => {
    setItems([]);
    setPage(0);
    getItems(0, debouncedSearchValue);
  }, [debouncedSearchValue]);

  const getMoreItems = useCallback(async () => {
    if (isFetching || dataIsOver) return;
    setPage((prevState) => prevState + LIMIT);
    await getItems(page + LIMIT, debouncedSearchValue);
  }, [isFetching, page, debouncedSearchValue, getItems, dataIsOver]);
  const refresh = useCallback(async () => {
    setPage(0);
    setSearchValue('');
    setIsRefreshing(true);
    await getItems(0);
    setIsRefreshing(false);
  }, [getItems]);
  const handleChangeText = (text) => {
    setIsFiltering(true);
    setSearchValue(text);
  };

  const ListHeaderComponent = useMemo(
    () => (
      <UIView backgroundColor={Colors.white} style={[styles.listHeaderComponentContainer, { paddingTop: isIOS ? top : 30 }]}>
        <UIView center marginB-10>
          <LogoSVG />
        </UIView>
        <UITextField placeholder={'Search'} value={searchValue} onChangeText={handleChangeText} />
      </UIView>
    ),
    [searchValue]
  );

  if (isLoading)
    return (
      <>
        <UIView height={200} width={SCREEN_WIDTH} backgroundColor={Colors.grey30} />
        <ProductsListSkeleton />
      </>
    );

  return (
    <FetchToOpacity isFetching={isRefreshing || isFiltering}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
        onEndReachedThreshold={0.1}
        onEndReached={getMoreItems}
        ListFooterComponent={items.length > 0 && !dataIsOver ? <ListFooterLoader shouldShow={isFetching} /> : undefined}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={isLoading ? ProductsListSkeleton : isFetching ? undefined : <ListEmptyComponent searchValue={debouncedSearchValue} />}
        stickyHeaderIndices={[0]}
        style={{ backgroundColor: Colors.white }}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        showsVerticalScrollIndicator={false}
      />
    </FetchToOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    columnGap: 12,
    marginVertical: 30,
    paddingHorizontal: Spacings.s5,
  },
  listEmptyComponentLottie: {
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_WIDTH / 1.5,
  },
  listHeaderComponentContainer: {
    ...uiScreenPaddings,
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: '#181818',
    shadowOffset: { height: 10, width: 0 },
  },
});
