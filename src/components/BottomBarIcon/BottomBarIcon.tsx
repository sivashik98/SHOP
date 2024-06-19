import { FC, useRef } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import { BottomBarIconProps } from 'components/BottomBarIcon/types';

export const BottomBarIcon: FC<BottomBarIconProps> = ({ focused, styles: outsideStyles, ...props }) => {
  const lottieRef = useRef<LottieView>();

  if (focused) lottieRef.current?.play();
  else lottieRef.current?.reset();

  return <LottieView ref={lottieRef} loop style={[styles.lottie, outsideStyles]} {...props} />;
};

const styles = StyleSheet.create({
  lottie: {
    width: '100%',
    height: '100%',
  },
});
