import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import { UIStack, UIText, UITouchableOpacity, UIView } from 'components/UIKit';
import { ScaleOnMount } from 'components/ScaleOnMount';
import { SwipeToDeleteProduct } from 'modules/products/components/SwipeToDeleteProduct';

import { Product } from 'src/api/types';
import { BasketCardProps } from 'modules/products/components/BasketCard/types';
import { isPremiumProduct } from 'modules/products/utils';

export const BasketCardLoader = ({}) => {
  return (
    <UIView br50 row padding-10 spread backgroundColor={Colors.white} style={styles.container}>
      <UIView flex spread>
        <UIStack flex gap={10}>
          <UIView br50 height={25} width={'80%'} backgroundColor={Colors.grey30} />
          <UIView br50 height={15} width={'50%'} backgroundColor={Colors.grey30} />
        </UIStack>
        <UIView br50 height={20} width={'35%'} backgroundColor={Colors.grey30} />
      </UIView>
      <UIView br50 height={100} width={100} backgroundColor={Colors.grey30} />
    </UIView>
  );
};

export const BasketCard: FC<BasketCardProps> = ({ item }) => {
  const { navigate } = useNavigation();
  const { id, price, brand, thumbnail, rating, title }: Product = item || {};

  return (
    <ScaleOnMount>
      <SwipeToDeleteProduct productId={id} productTitle={title}>
        <UITouchableOpacity
          flex
          br50
          row
          padding-10
          backgroundColor={isPremiumProduct(rating) ? Colors.yellow10 : Colors.white}
          style={styles.container}
          onPress={() => navigate('Product', { id })}
          activeOpacity={1}
        >
          <UIView flex>
            <UIStack gap={6} flex>
              <UIText h2>{title}</UIText>
              <UIText bodyM4 color={Colors.grey70}>
                {brand ? brand : 'No brand'}
              </UIText>
            </UIStack>

            <UIText bodyB1>${price}</UIText>
          </UIView>

          <Image source={thumbnail} style={styles.image} contentFit='contain' />

          {isPremiumProduct(rating) ? (
            <>
              <LottieView speed={1} loop autoPlay source={require('lottie/flickering-stars.json')} style={styles.lottieStars} />
              <LottieView speed={0.5} loop autoPlay source={require('lottie/flickering-stars-small.json')} style={styles.lottieStarsBottom} />
            </>
          ) : null}
        </UITouchableOpacity>
      </SwipeToDeleteProduct>
    </ScaleOnMount>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: '#181818',
    shadowOffset: { height: 0, width: 0 },
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 21, 47, 0.06)',
  },
  lottieStars: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  lottieStarsBottom: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
});
