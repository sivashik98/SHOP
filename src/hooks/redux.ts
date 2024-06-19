import { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatchType, RootStateType } from 'src/store/store';
import { addFavorites, removeFavorites } from 'src/store/slices/favoritesSlice';
import { addToBasket, removeFromBasket } from 'src/store/slices/basketSlice';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export const useLikeProduct = (id: number, title: string) => {
  const { favorites, isLoading } = useAppSelector((state) => state.favoritesReducer);
  const dispatch = useAppDispatch();
  const isLiked = favorites.includes(id);

  const handleLike = useCallback(() => {
    if (isLiked) dispatch(removeFavorites({ id, title }));
    else dispatch(addFavorites({ id, title }));
  }, [isLiked]);

  return { isLiked, handleLike, isLoadingFavorites: isLoading } as { isLiked: boolean; handleLike: () => void; isLoadingFavorites: boolean };
};

export const useBasket = (id: number, title: string) => {
  const { basket, isLoading } = useAppSelector((state) => state.basketReducer);
  const dispatch = useAppDispatch();
  const isInBasked = basket.includes(id);

  const handleBasket = useCallback(() => {
    if (isInBasked) dispatch(removeFromBasket({ id, title }));
    else dispatch(addToBasket({ id, title }));
  }, [isInBasked]);

  return { handleBasket, isInBasked, isLoadingBasket: isLoading } as { isInBasked: boolean; isLoadingBasket: boolean; handleBasket: () => void };
};
