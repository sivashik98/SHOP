import { HOT_CATEGORIES, PREMIUM_PRODUCT_RATING_THRESHOLD } from 'src/constants';
import { canOpenURL, openURL } from 'expo-linking';

export const isHotCategory = (category: string) => HOT_CATEGORIES.includes(category);

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isPremiumProduct = (rating: number) => rating > PREMIUM_PRODUCT_RATING_THRESHOLD;

export const openLink = async (url?: string) => {
  if (!url) return;

  // Checking if the link is supported for links with custom URL scheme.
  const supported = await canOpenURL(url);
  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await openURL(url);
  }
};
