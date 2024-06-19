import React, { FC } from 'react';
import { Colors } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UIStack } from 'components/UIKit';
import { CategoryCardLoader } from 'modules/products/components/CategoryCard';

import { uiScreenPaddings } from 'components/UIKit/styles';
import { CategoriesListSkeletonProps } from 'modules/products/components/skeletons/CategoriesListSkeleton/types';

export const CategoriesListSkeleton: FC<CategoriesListSkeletonProps> = () => {
  const { top } = useSafeAreaInsets();

  return (
    <UIStack gap={20} marginT-20 flex backgroundColor={Colors.white} style={{ paddingTop: top, ...uiScreenPaddings }}>
      <CategoryCardLoader />
      <CategoryCardLoader />
      <CategoryCardLoader />
      <CategoryCardLoader />
      <CategoryCardLoader />
    </UIStack>
  );
};
