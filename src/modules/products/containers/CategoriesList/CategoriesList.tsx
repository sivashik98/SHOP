import React, { useState, useCallback, FC } from 'react';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UIView } from 'components/UIKit';
import { FetchToOpacity } from 'components/FetchToOpacity';
import { CategoryCard } from 'modules/products/components/CategoryCard';
import { CategoriesListSkeleton } from 'modules/products/components/skeletons/CategoriesListSkeleton';

import { useGetCategoriesQuery } from 'src/api/api';
import { uiScreenPaddings } from 'components/UIKit/styles';
import { CategoriesListProps } from 'modules/products/containers/CategoriesList/types';

export const CategoriesList: FC<CategoriesListProps> = ({}) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { data, isLoading, isFetching, isError, refetch } = useGetCategoriesQuery({});
  const { top } = useSafeAreaInsets();

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    refetch({});
    setIsRefreshing(false);
  }, [refetch]);

  if (isLoading) return <CategoriesListSkeleton />;

  if (isError) return null;

  return (
    <FetchToOpacity isFetching={isFetching}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.white }}
        contentContainerStyle={{ paddingTop: top, backgroundColor: Colors.white, ...uiScreenPaddings }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
      >
        {data.map((category: string) => (
          <UIView key={category} marginT-20>
            <CategoryCard category={category} />
          </UIView>
        ))}
      </ScrollView>
    </FetchToOpacity>
  );
};
