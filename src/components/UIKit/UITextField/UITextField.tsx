import { Colors, TouchableOpacity } from 'react-native-ui-lib';
import { TextField } from 'react-native-ui-lib';
import { FC, forwardRef, useEffect, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AntDesign, EvilIcons } from '@expo/vector-icons';

import { UIView } from 'components/UIKit';

import { UITextFieldProps } from './types';
import { isAndroid } from 'src/constants';

const DURATION = 500;

const SearchIcon = () => (
  <UIView marginL-2>
    <EvilIcons name='search' size={isAndroid ? 26 : 22} color={Colors.grey80} />
  </UIView>
);
const ClearIcon = ({ styles, onPress }) => (
  <UIView reanimated center marginR-12 style={styles}>
    <TouchableOpacity onPress={onPress}>
      <AntDesign name='closecircle' size={16} color={Colors.grey80} />
    </TouchableOpacity>
  </UIView>
);

export const UITextField: FC<UITextFieldProps> = forwardRef(({ value, onChangeText, placeholder, onFocus, onBlur, ...props }, ref) => {
  const [focused, setFocused] = useState<boolean>(false);
  const shouldClearAppear = useSharedValue<boolean>(false);
  const filled = value;
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(shouldClearAppear.value ? 1 : 0, { duration: DURATION }),
    zIndex: withTiming(shouldClearAppear.value ? 1 : -1, { duration: DURATION }),
  }));

  useEffect(() => {
    shouldClearAppear.value = value && focused;
  }, [value, focused, shouldClearAppear]);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = () => {
    setFocused(false);
    (onBlur as any)?.();
  };
  const handleClear = () => onChangeText?.('');

  return (
    <UIView row reanimated style={styles.wrapInput}>
      <SearchIcon />
      <TextField
        ref={ref}
        containerStyle={styles.container}
        fieldStyle={styles.field}
        style={styles.input}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focusable={false}
        selectionColor={'#426BF2'}
        value={value}
        placeholder={placeholder && placeholder.length > 25 ? placeholder.slice(0, 25) : placeholder}
        {...props}
      />
      {filled && <ClearIcon styles={animatedStyles} onPress={handleClear} />}
    </UIView>
  );
});

const styles = StyleSheet.create({
  wrapInput: {
    backgroundColor: 'rgba(0, 21, 47, 0.06)',
    borderRadius: 8,
    paddingVertical: 10,
  },
  container: {
    paddingRight: 8,
    paddingLeft: 4,
    flex: 1,
  },
  field: {
    flexGrow: 1,
  },
  input: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue',
  },
});
