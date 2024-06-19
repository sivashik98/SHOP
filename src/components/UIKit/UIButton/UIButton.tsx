import { FC } from 'react';
import { Button, Colors } from 'react-native-ui-lib';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { UIText } from '../UIText';

import { UIButtonProps } from './types';

export const UIButton: FC<UIButtonProps> = ({ loading, title, disabled, onPress, backgroundColor, titleProps, ...props }) => {
  return (
    <Button
      center
      disabled={disabled}
      activeOpacity={loading ? 1 : 0.7}
      backgroundColor={backgroundColor || Colors.accent}
      disabledBackgroundColor={Colors.grey30}
      onPress={loading ? () => {} : onPress}
      style={styles.button}
      {...props}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <UIText bodyM2 color={disabled ? Colors.grey80 : Colors.white} {...titleProps}>
          {title}
        </UIText>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    minHeight: 55,
  },
});
