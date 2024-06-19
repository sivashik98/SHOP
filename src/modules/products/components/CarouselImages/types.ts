import { SharedValue } from 'react-native-reanimated';

export type CarouselImagesProps = {
  data: string[];
  scrollOffset: SharedValue<number>;
  onChangePage: (page: number) => void;
};
