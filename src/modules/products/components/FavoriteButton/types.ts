import { ViewStyle } from 'react-native';

export type FavoriteButtonProps = {
  loading: boolean;
  isLiked: boolean;
  onPress: () => void;
  styles?: ViewStyle;
};
