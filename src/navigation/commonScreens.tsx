import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoriesScreen, ProductsByCategoryScreen, ProductScreen } from 'modules/products';

const screens = [
  {
    component: CategoriesScreen,
    name: 'Categories',
    options: { headerShown: false },
  },
  {
    component: ProductsByCategoryScreen,
    name: 'ProductsByCategory',
    options: { headerShown: false },
  },
  {
    component: ProductScreen,
    name: 'Product',
    options: { headerShown: false },
  },
];

export const commonScreens = (StackNavigator) => screens.map((props) => <StackNavigator.Screen key={props.name} {...props} />);
