import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { api } from 'api/api';
import favoritesReducer from 'src/store/slices/favoritesSlice';
import basketReducer from 'src/store/slices/basketSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  favoritesReducer,
  basketReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof store>;
export type AppDispatchType = AppStoreType['dispatch'];
