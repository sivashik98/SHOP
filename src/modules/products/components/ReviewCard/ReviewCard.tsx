import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Spacings } from 'react-native-ui-lib';

import { UIStack, UIText, UIView } from 'components/UIKit';

import { ReviewCardProps } from 'modules/products/components/ReviewCard/types';
import { SCREEN_WIDTH } from 'src/constants';

export const ReviewCard: FC<ReviewCardProps> = ({ review, styles: outsideStyles }) => {
  return (
    <UIStack gap={10} row style={[styles.item, outsideStyles]}>
      <UIView center width={80} height={80} br100 backgroundColor={Colors.grey30}>
        <UIText h1 color={Colors.accent}>
          {review.reviewerName[0]}
        </UIText>
      </UIView>

      <UIStack gap={4} flex>
        <UIView row spread>
          <UIView>
            <UIText h2 numberOfLines={1} color={Colors.accent}>
              {review.reviewerName}
            </UIText>
            <UIText bodyM4 marginT-2 numberOfLines={1} color={Colors.accent}>
              {review.reviewerEmail}
            </UIText>
          </UIView>
          <UIText bodyM3 color={Colors.grey80}>
            {review.rating}.0
          </UIText>
        </UIView>

        <UIText bodyM3 numberOfLines={4} color={Colors.grey80}>
          {review.comment}
        </UIText>
      </UIStack>
    </UIStack>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 14,
    margin: 6,
    width: SCREEN_WIDTH - 40,
    borderRadius: 14,
    marginHorizontal: Spacings.s5,
    elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: '#181818',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: '#fff',
  },
});
