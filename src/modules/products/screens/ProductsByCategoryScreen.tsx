import React from 'react';
import { useRoute } from '@react-navigation/native';

import { ProductsByCategoryList } from 'modules/products/containers/ProductsByCategoryList';
import { ProductByCategoryHeader } from 'modules/products/components/ProductByCategoryHeader';

export const ProductsByCategoryScreen = () => {
  const { category } = useRoute()?.params;

  return (
    <>
      <ProductByCategoryHeader category={category} />
      <ProductsByCategoryList category={category} />
    </>
  );
};
