import { ViewStyle } from 'react-native';

import { Comment } from 'src/api/types';

export type CarouselReviewsProps = {
  data: Comment[];
  itemStyles?: ViewStyle;
};
