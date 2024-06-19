import { SharedValue } from 'react-native-reanimated';

export type PaginatorProps = {
  data: string[];
  scrollOffset: SharedValue<number>;
};
