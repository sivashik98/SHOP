import { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';

import { UIViewProps } from 'components/UIKit/UIView/types';

export type ScaleOnMountPropsType = {
  children: PropsWithChildren;
  styles?: ViewStyle;
} & UIViewProps;
