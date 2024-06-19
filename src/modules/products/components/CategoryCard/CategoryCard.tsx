import { FC, memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { UIStack, UIText, UITouchableOpacity, UIView } from 'components/UIKit';
import { PressToDownscale } from 'components/PressToDownscale';

import { CategoryCardProps } from 'modules/products/components/CategoryCard/types';
import { CATEGORIES_IMAGES, isAndroid, isIOS } from 'src/constants';
import { isHotCategory } from 'modules/products/utils';

export const CategoryCardLoader = ({}) => {
  return (
    <UIView row flex br50 backgroundColor={Colors.white} style={styles.container}>
      <UIView flex centerV paddingL-20>
        <UIView height={25} backgroundColor={Colors.grey30} style={{ borderRadius: 6, width: '80%' }} />
      </UIView>

      <UIView flex backgroundColor={Colors.grey30} />
    </UIView>
  );
};

const COLOR_START = '#bd0000';
const COLOR_END = '#c75c00';
const CONFIG = { duration: 800 };

export const CategoryCard: FC<CategoryCardProps> = memo(({ category }) => {
  const { navigate } = useNavigation();
  const progress = useSharedValue<number>(0);
  const backgroundColor = isHotCategory(category) ? Colors.red10 : Colors.white;

  useEffect(() => {
    progress.value = withRepeat(withSequence(withTiming(1, CONFIG), withTiming(0, CONFIG)), -1);
  }, []);

  const iOSAnimatedStyles = useAnimatedStyle(() => ({
    shadowColor: interpolateColor(progress.value, [0, 1], [COLOR_START, COLOR_END]),
  }));

  return (
    <PressToDownscale>
      <UITouchableOpacity onPress={() => navigate('ProductsByCategory', { category })}>
        <UIStack gap={10} row backgroundColor={backgroundColor} style={styles.container}>
          <UIView flex centerV paddingL-25>
            <UIText h2>{category.toUpperCase().replace(/-/g, ' ')}</UIText>
            {isHotCategory(category) ? (
              <>
                <Animated.Text style={[styles.hotText, isIOS && iOSAnimatedStyles]}>Hot category</Animated.Text>
                <LottieView autoPlay speed={0.9} loop source={require('lottie/salyut.json')} style={styles['salyut-right']} />
                <LottieView autoPlay speed={0.6} loop source={require('lottie/salyut.json')} style={styles['salyut-left']} />
              </>
            ) : null}
          </UIView>
          <UIView flex>
            <Image source={CATEGORIES_IMAGES[category] || ''} style={[styles.image, { backgroundColor: Colors.grey30 }]} />
          </UIView>
        </UIStack>
      </UITouchableOpacity>
    </PressToDownscale>
  );
});

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: '#181818',
    shadowOffset: { height: 0, width: 0 },
    borderRadius: 8,
  },
  image: {
    height: 120,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  hotText: {
    position: 'absolute',
    top: 5,
    left: 10,
    color: '#fff2f2',
    textShadowColor: COLOR_START,
    textShadowRadius: isAndroid ? 2 : 0.5,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1.5,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 20,
    fontFamily: 'HelveticaNeueBold',
  },
  'salyut-right': {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 100,
    height: 100,
  },
  'salyut-left': {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 50,
    height: 50,
  },
});
