import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';

import { UITouchableOpacityProps } from './types';
import { isAndroid } from 'src/constants';

export const UITouchableOpacity: FC<UITouchableOpacityProps> = ({ activeOpacity, children, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={isAndroid ? 1 : activeOpacity || 0.7} {...props}>
      {children}
    </TouchableOpacity>
  );
};
