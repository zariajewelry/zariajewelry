import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PromoState {
  code: string;
  applied: boolean;
  discount: number;
  isOpen: boolean;
}

const initialState: PromoState = {
  code: '',
  applied: false,
  discount: 0,
  isOpen: false,
};

export const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    togglePromoSection: (state) => {
      state.isOpen = !state.isOpen;
    },
    applyPromo: (state, action: PayloadAction<number>) => {
      state.applied = true;
      state.discount = action.payload;
    },
    resetPromo: (state) => {
      state.code = '';
      state.applied = false;
      state.discount = 0;
    },
  },
});

export const { setPromoCode, togglePromoSection, applyPromo, resetPromo } = promoSlice.actions;

export default promoSlice.reducer;