import React, { FC } from 'react';
import { Colors } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UIStack, UIView } from 'components/UIKit';

import { uiScreenPaddings } from 'components/UIKit/styles';
import { ProductSkeletonProps } from 'modules/products/components/skeletons/ProductSkeleton/types';
import { isIOS, SCREEN_WIDTH } from 'src/constants';

export const ProductSkeleton: FC<ProductSkeletonProps> = () => {
  const { top } = useSafeAreaInsets();

  return (
    <UIView flex backgroundColor={Colors.white} style={[uiScreenPaddings, { paddingTop: isIOS ? top : 40 }]}>
      <UIStack gap={20} center>
        <UIView br20 width={SCREEN_WIDTH - 40} height={SCREEN_WIDTH - 40} backgroundColor={Colors.grey30} />
        <UIView br20 width={80} height={20} backgroundColor={Colors.grey30} />
      </UIStack>

      <UIStack gap={30} marginT-30>
        <UIView br20 width={SCREEN_WIDTH / 2} height={40} backgroundColor={Colors.grey30} />
        <UIView br20 width={SCREEN_WIDTH / 1.5} height={20} backgroundColor={Colors.grey30} />
        <UIView br20 width={SCREEN_WIDTH / 3} height={20} backgroundColor={Colors.grey30} />
        <UIView br20 width={SCREEN_WIDTH / 1.5} height={40} backgroundColor={Colors.grey30} />
      </UIStack>
    </UIView>
  );
};
