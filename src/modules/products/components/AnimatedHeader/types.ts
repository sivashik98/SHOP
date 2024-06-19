import { SharedValue } from 'react-native-reanimated';
import { ViewStyle } from 'react-native';

export type AnimatedHeaderProps = {
  title?: string;
  scrollOffset: SharedValue<number>;
  styles?: ViewStyle;
};
