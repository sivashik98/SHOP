import React, { FC } from 'react';
import { Colors } from 'react-native-ui-lib';

import { UIStack } from 'components/UIKit';
import { ProductCardLoader } from 'modules/products/components/ProductCard';

import { uiScreenPaddings } from 'components/UIKit/styles';
import { ProductsListSkeletonProps } from 'modules/products/components/skeletons/ProductsListSkeleton/types';

export const ProductsListSkeleton: FC<ProductsListSkeletonProps> = () => {
  return (
    <UIStack gap={30} flex backgroundColor={Colors.white} style={uiScreenPaddings}>
      <UIStack gap={15} row>
        <ProductCardLoader />
        <ProductCardLoader />
      </UIStack>
      <UIStack gap={15} row>
        <ProductCardLoader />
        <ProductCardLoader />
      </UIStack>
      <UIStack gap={15} row>
        <ProductCardLoader />
        <ProductCardLoader />
      </UIStack>
      <UIStack gap={15} row>
        <ProductCardLoader />
        <ProductCardLoader />
      </UIStack>
    </UIStack>
  );
};
