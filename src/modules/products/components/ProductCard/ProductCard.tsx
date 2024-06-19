import { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import { UIStack, UIText, UITouchableOpacity, UIView } from 'components/UIKit';
import { LikeButton } from 'components/LikeButton';
import { ScaleOnMount } from 'components/ScaleOnMount';
import { PressToDownscale } from 'components/PressToDownscale';
import { FetchToOpacity } from 'components/FetchToOpacity';

import { Product } from 'src/api/types';
import { useLikeProduct } from 'hooks/redux';
import { isPremiumProduct } from 'modules/products/utils';

export const ProductCardLoader = ({}) => {
  return (
    <UIView flex br50 backgroundColor={Colors.white} style={styles.container}>
      <UIView right padding-10 height={150} backgroundColor={Colors.grey30} style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
        <AntDesign name='hearto' size={24} color={Colors.white} />
      </UIView>
      <UIStack gap={10} margin-10>
        <UIView br50 height={20} backgroundColor={Colors.grey30} style={{ width: '90%' }} />
        <UIView br50 height={15} backgroundColor={Colors.grey30} style={{ width: '40%' }} />
        <UIView br50 height={25} backgroundColor={Colors.grey30} style={{ width: '55%' }} />
      </UIStack>
    </UIView>
  );
};

export const ProductCard: FC<{ item: Product }> = memo(({ item }) => {
  const { navigate } = useNavigation();
  const { id, price, brand, thumbnail, rating, title }: Product = item || {};
  const { isLiked, handleLike, isLoadingFavorites } = useLikeProduct(id, title);
  const backgroundColor = isPremiumProduct(rating) ? Colors.yellow10 : Colors.white;

  return (
    <FetchToOpacity isFetching={isLoadingFavorites}>
      <ScaleOnMount>
        <PressToDownscale>
          <UITouchableOpacity flex onPress={() => navigate('Product', { id })}>
            <UIView flex br50 padding-10 backgroundColor={backgroundColor} style={styles.container}>
              <UIView absR style={styles.heart}>
                <LikeButton isLiked={isLiked} onPress={handleLike} />
              </UIView>
              <Image source={thumbnail} style={styles.image} contentFit='contain' />
              <UIText bodyB3 marginT-12>
                {title}
              </UIText>
              <UIStack gap={8} flex bottom marginT-8>
                <UIText bodyM4>{brand ? brand : 'No brand'}</UIText>

                <UIView row spread centerV>
                  <UIText bodyB1>$ {price}</UIText>

                  <UIView center row>
                    <UIText bodyM4 marginR-10>
                      {rating}
                    </UIText>
                    <LottieView speed={0.3} loop autoPlay source={require('lottie/coin-star.json')} style={styles.star} />
                  </UIView>
                </UIView>
              </UIStack>

              {isPremiumProduct(rating) ? (
                <>
                  <LottieView speed={1} loop autoPlay source={require('lottie/flickering-stars.json')} style={styles.lottieStars} />
                  <LottieView speed={0.5} loop autoPlay source={require('lottie/flickering-stars-small.json')} style={styles.lottieStarsBottom} />
                </>
              ) : null}
            </UIView>
          </UITouchableOpacity>
        </PressToDownscale>
      </ScaleOnMount>
    </FetchToOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: '#181818',
    shadowOffset: { height: 0, width: 0 },
  },
  image: {
    height: 150,
  },
  heart: {
    zIndex: 1,
  },
  lottieStars: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  lottieStarsBottom: {
    position: 'absolute',
    top: 150,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  star: {
    width: 20,
    height: 20,
  },
});
