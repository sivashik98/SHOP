import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { delay } from 'modules/products/utils';

// Async Actions
export const addFavorites = createAsyncThunk('add/favorites', async ({ id, title }: { id: number; title: string }, thunkAPI) => {
  try {
    const item = await AsyncStorage.getItem('favorites');
    const data = JSON.parse(item);
    await AsyncStorage.setItem('favorites', JSON.stringify([...data, id]));
    await delay(1000);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(`Can't add product ${title} to favorite`);
  }
});
export const removeFavorites = createAsyncThunk('remove/favorites', async ({ id, title }: { id: number; title: string }, thunkAPI) => {
  try {
    const item = await AsyncStorage.getItem('favorites');
    const data = JSON.parse(item);
    await AsyncStorage.setItem('favorites', JSON.stringify(data.filter((el) => el !== id)));
    await delay(500);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(`Can't remove product ${title} from favorite`);
  }
});

type initialState = {
  favorites: number[];
  isLoading: boolean;
  error: string;
};

const initialState: initialState = {
  favorites: [],
  isLoading: false,
  error: '',
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addManyFavorites: (state, action: PayloadAction<number[]>) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        state.favorites = [...state.favorites, action.payload];
        state.isLoading = false;
      })
      .addCase(addFavorites.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(removeFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((el) => el !== action.payload);
        state.isLoading = false;
      })
      .addCase(removeFavorites.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { addManyFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
