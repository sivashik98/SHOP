import React, { FC, memo, useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

import { LikeButtonProps } from 'components/LikeButton/types';
import useIsFirstRender from 'hooks/useIsFirstRender';

export const LikeButton: FC<LikeButtonProps> = memo(({ onPress, isLiked = false }) => {
  const isFirstRender = useIsFirstRender();
  const lottieRef = useRef<LottieView>();
  const source = require('lottie/heart.json');
  const progress = isFirstRender && isLiked ? 1000 : 0;

  useEffect(() => {
    if (isFirstRender) return;
    if (isLiked) lottieRef.current?.play();
    else lottieRef.current?.reset();
  }, [isLiked, isFirstRender]);

  const handlePress = async () => {
    await impactAsync(ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={handlePress}>
      <LottieView ref={lottieRef} progress={progress} source={source} loop={false} speed={3} style={styles.lottie} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  lottie: {
    width: 60,
    height: 60,
  },
});
