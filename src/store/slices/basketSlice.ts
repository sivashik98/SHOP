import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { delay } from 'modules/products/utils';

// Async Actions
export const addToBasket = createAsyncThunk('add/basket', async ({ id, title }: { id: number; title: string }, thunkAPI) => {
  try {
    const item = await AsyncStorage.getItem('basket');
    const data = JSON.parse(item);
    await AsyncStorage.setItem('basket', JSON.stringify([...data, id]));
    await delay(3000);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(`Can't add product ${title} to basket`);
  }
});
export const removeFromBasket = createAsyncThunk('remove/basket', async ({ id, title }: { id: number; title: string }, thunkAPI) => {
  try {
    const item = await AsyncStorage.getItem('basket');
    const data = JSON.parse(item);
    await AsyncStorage.setItem('basket', JSON.stringify(data.filter((el) => el !== id)));
    await delay(3000);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(`Can't remove product ${title} from basket`);
  }
});
export const removeAllFromBasket = createAsyncThunk('removeAll/basket', async (_, thunkAPI) => {
  try {
    await AsyncStorage.setItem('basket', '[]');
    delay(1500);
  } catch (e) {
    return thunkAPI.rejectWithValue(`Problem with your payment`);
  }
});

type initialState = {
  basket: number[];
  isLoading: boolean;
  error: string;
};

const initialState: initialState = {
  basket: [],
  isLoading: false,
  error: '',
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addManyToBasket: (state, action: PayloadAction<number[]>) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToBasket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.basket = [...state.basket, action.payload];
        state.isLoading = false;
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(removeFromBasket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.basket = state.basket.filter((el) => el !== action.payload);
        state.isLoading = false;
      })
      .addCase(removeFromBasket.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(removeAllFromBasket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAllFromBasket.fulfilled, (state, action) => {
        state.basket = [];
        state.isLoading = false;
      })
      .addCase(removeAllFromBasket.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { addManyToBasket } = basketSlice.actions;

export default basketSlice.reducer;
