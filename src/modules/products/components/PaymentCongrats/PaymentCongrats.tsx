import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

import { UIText, UITouchableOpacity, UIView } from 'components/UIKit';

import { isIOS, SCREEN_WIDTH, TG_USERNAME } from 'src/constants';
import { PaymentCongratsProps } from 'modules/products/components/PaymentCongrats/types';
import { openLink } from 'modules/products/utils';
import { uiScreenPaddings } from 'components/UIKit/styles';

export const PaymentCongrats: FC<PaymentCongratsProps> = ({}) => {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  const handlePress = async () => {
    await openLink(TG_USERNAME);
  };

  return (
    <UIView center reanimated absF backgroundColor={Colors.white}>
      <UITouchableOpacity onPress={goBack} style={[styles.button, { paddingTop: isIOS ? top : 20 }]}>
        <AntDesign name='closecircleo' size={24} color='black' />
      </UITouchableOpacity>
      <UIText h2 color={Colors.grey70}>
        Congratulations with your purchase!
      </UIText>
      <UIText h1 marginT-20 color={Colors.accent}>
        enjoy it...
      </UIText>
      <UIText h2 marginT-20 color={Colors.accent} onPress={handlePress}>
        and say thanks to me...
      </UIText>
      <LottieView autoPlay loop source={require('lottie/payment-congrats-green')} style={styles.green} />
      <LottieView autoPlay speed={0.8} loop source={require('lottie/payment-congrats-red')} style={[styles.red, styles['red-left']]} />
      <LottieView autoPlay speed={0.7} loop source={require('lottie/payment-congrats-red')} style={[styles.red, styles['red-right']]} />
    </UIView>
  );
};

const styles = StyleSheet.create({
  green: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    zIndex: -1,
  },
  red: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    zIndex: -1,
  },
  'red-left': {
    bottom: 50,
    left: -SCREEN_WIDTH / 3,
    transform: [{ rotate: '20deg' }],
  },
  'red-right': {
    bottom: -100,
    right: -SCREEN_WIDTH / 4,
    transform: [{ rotate: '-20deg' }],
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    ...uiScreenPaddings,
  },
});
