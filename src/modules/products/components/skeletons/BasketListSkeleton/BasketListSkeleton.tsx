import React, { FC } from 'react';
import { Colors } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UIStack } from 'components/UIKit';

import { BasketCardLoader } from 'modules/products/components/BasketCard';

import { uiScreenPaddings } from 'components/UIKit/styles';
import { BasketListSkeletonProps } from 'modules/products/components/skeletons/BasketListSkeleton/types';

export const BasketListSkeleton: FC<BasketListSkeletonProps> = () => {
  const { top } = useSafeAreaInsets();
  return (
    <UIStack gap={20} backgroundColor={Colors.white} marginT-20 style={{ paddingTop: top, ...uiScreenPaddings }}>
      <BasketCardLoader />
      <BasketCardLoader />
      <BasketCardLoader />
      <BasketCardLoader />
      <BasketCardLoader />
      <BasketCardLoader />
      <BasketCardLoader />
    </UIStack>
  );
};
