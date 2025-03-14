import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import promoReducer from './slices/promoSlice';
import shippingReducer from './slices/shippingSlice';
import giftBagReducer from './slices/giftBagSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    promo: promoReducer,
    shipping: shippingReducer,
    giftBag: giftBagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;