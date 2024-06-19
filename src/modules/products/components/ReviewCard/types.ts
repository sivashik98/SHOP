import { ViewStyle } from 'react-native';

import { Comment } from 'src/api/types';

export type ReviewCardProps = {
  review: Comment;
  styles?: ViewStyle;
};
