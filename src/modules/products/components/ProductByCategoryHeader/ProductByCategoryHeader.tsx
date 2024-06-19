import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import upperFirst from 'lodash/upperFirst';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { UIText, UITouchableOpacity, UIView } from 'components/UIKit';

import { ProductByCategoryHeaderProps } from 'modules/products/components/ProductByCategoryHeader/types';
import { uiScreenPaddings } from 'components/UIKit/styles';
import { isHotCategory } from 'modules/products/utils';
import { isIOS } from 'src/constants';

export const ProductByCategoryHeader: FC<ProductByCategoryHeaderProps> = ({ category }) => {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const backgroundColor = isHotCategory(category) ? Colors.red10 : Colors.white;

  return (
    <UIView row centerV backgroundColor={backgroundColor} style={[styles.container, { paddingTop: isIOS ? top : 40 }]}>
      {isHotCategory(category) ? <LottieView autoPlay loop source={require('lottie/hot-stamp')} style={styles.lottie} /> : null}

      <UITouchableOpacity onPress={goBack}>
        <AntDesign name='arrowleft' size={22} color='black' />
      </UITouchableOpacity>

      <UIView marginL-12>
        <UIText h2>{upperFirst(category).replace(/-/g, ' ')}</UIText>
      </UIView>
    </UIView>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: '#181818',
    shadowOffset: { height: 0, width: 0 },
    zIndex: 1,
    ...uiScreenPaddings,
  },
  lottie: {
    position: 'absolute',
    bottom: isIOS ? 0 : -20,
    right: 0,
    width: 120,
    height: 120,
    transform: [{ rotate: '30deg' }],
  },
});
