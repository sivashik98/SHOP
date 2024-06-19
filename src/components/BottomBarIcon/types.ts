import { LottieViewProps } from 'lottie-react-native';
import { ViewStyle } from 'react-native';

export type BottomBarIconProps = {
  focused: boolean;
  styles?: ViewStyle;
} & LottieViewProps;
