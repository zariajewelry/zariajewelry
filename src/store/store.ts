import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import promoReducer from './slices/promoSlice';
import shippingReducer from './slices/shippingSlice';
import giftBagReducer from './slices/giftBagSlice';
import uiReducer from './slices/uiSlice';
import productFiltersReducer from './slices/productFiltersSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    promo: promoReducer,
    shipping: shippingReducer,
    giftBag: giftBagReducer,
    productFilters: productFiltersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;