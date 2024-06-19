import { Dimensions, Platform } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const TG_USERNAME = 'https://t.me/maximuSpartan98';

export const RATING_SOURCES = [
  require('lottie/rating-1.json'),
  require('lottie/rating-2.json'),
  require('lottie/rating-3.json'),
  require('lottie/rating-4.json'),
  require('lottie/rating-5.json'),
];

export const FAKE_IMAGES = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=2351&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export const PREMIUM_PRODUCT_RATING_THRESHOLD = 4.3;
export const HOT_CATEGORIES: string[] = ['home-decoration', 'furniture', 'mens-shirts', 'mens-shoes', 'skin-care', 'tops', 'tablets'];

export const CATEGORIES_IMAGES = {
  beauty: require('jpg/category-1.jpg'),
  fragrances: require('jpg/category-2.jpg'),
  furniture: require('jpg/category-3.jpg'),
  groceries: require('jpg/category-4.jpg'),
  'home-decoration': require('jpg/category-5.jpg'),
  'kitchen-accessories': require('jpg/category-6.jpg'),
  laptops: require('jpg/category-7.jpg'),
  'mens-shirts': require('jpg/category-8.jpg'),
  'mens-shoes': require('jpg/category-9.jpg'),
  'mens-watches': require('jpg/category-10.jpg'),
  'mobile-accessories': require('jpg/category-11.jpg'),
  motorcycle: require('jpg/category-12.jpg'),
  'skin-care': require('jpg/category-13.jpg'),
  smartphones: require('jpg/category-14.jpg'),
  'sports-accessories': require('jpg/category-15.jpg'),
  sunglasses: require('jpg/category-7.jpg'),
  tablets: require('jpg/category-8.jpg'),
  tops: require('jpg/category-9.jpg'),
  vehicle: require('jpg/category-1.jpg'),
  'womens-bags': require('jpg/category-2.jpg'),
  'womens-dresses': require('jpg/category-3.jpg'),
  'womens-jewellery': require('jpg/category-4.jpg'),
  'womens-shoes': require('jpg/category-15.jpg'),
  'womens-watches': require('jpg/category-6.jpg'),
};
