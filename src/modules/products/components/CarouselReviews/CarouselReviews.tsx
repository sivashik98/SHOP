import React, { FC } from 'react';
import { FlatList } from 'react-native';

import { UIText, UIView } from 'components/UIKit';
import { ReviewCard } from 'modules/products/components/ReviewCard';

import { uiPaddingHorizontal } from 'components/UIKit/styles';
import { CarouselReviewsProps } from 'modules/products/components/CarouselReviews/types';

export const CarouselReviews: FC<CarouselReviewsProps> = ({ data, itemStyles }) => {
  return (
    <>
      <UIView marginV-6 style={uiPaddingHorizontal}>
        <UIText h1>Reviews</UIText>
      </UIView>
      <FlatList
        data={data}
        renderItem={({ item }) => <ReviewCard review={item} styles={itemStyles} />}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};
