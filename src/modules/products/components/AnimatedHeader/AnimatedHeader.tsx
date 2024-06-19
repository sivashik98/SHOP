import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UIText, UITouchableOpacity, UIView } from 'components/UIKit';

import { AnimatedHeaderProps } from 'modules/products/components/AnimatedHeader/types';
import { isIOS } from 'src/constants';
import { uiScreenPaddings } from 'components/UIKit/styles';

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({ title, scrollOffset, styles: outsideStyles }) => {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, 80], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <UIView
      reanimated
      center
      absT
      absR
      absL
      backgroundColor={Colors.white}
      style={[styles.header, { paddingTop: isIOS ? top : 40 }, animatedStyles, outsideStyles]}
    >
      <LottieView speed={1} loop autoPlay source={require('lottie/flickering-stars.json')} style={[styles.lottie, { top: -top }]} />
      <UIView center style={styles.backButton}>
        <UITouchableOpacity onPress={goBack}>
          <AntDesign name='arrowleft' size={24} color='black' />
        </UITouchableOpacity>
      </UIView>
      <UIText bodyB1>{title}</UIText>
    </UIView>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: '#181818',
    shadowOffset: { height: 1, width: 0 },
    elevation: 3,
    ...uiScreenPaddings,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    zIndex: -1,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    ...uiScreenPaddings,
  },
});
