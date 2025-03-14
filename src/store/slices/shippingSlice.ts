import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShippingState {
  postalCode: string;
  calculated: boolean;
  cost: number;
  isFreeShipping: boolean;
  isOpen: boolean;
}

const initialState: ShippingState = {
  postalCode: '',
  calculated: false,
  cost: 15, // Costo por defecto
  isFreeShipping: false,
  isOpen: false
};

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setPostalCode: (state, action: PayloadAction<string>) => {
      state.postalCode = action.payload;
      // Resetear el cálculo cuando cambia el código postal
      if (state.calculated) {
        state.calculated = false;
      }
    },
    calculateShipping: (state, action: PayloadAction<{cost: number, isFreeShipping: boolean}>) => {
      state.calculated = true;
      state.cost = action.payload.cost;
      state.isFreeShipping = action.payload.isFreeShipping;
    },
    resetShipping: (state) => {
      state.calculated = false;
      state.cost = 15;
      state.isFreeShipping = false;
    },
    toggleShippingSection: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { setPostalCode, calculateShipping, resetShipping, toggleShippingSection } = shippingSlice.actions;
export default shippingSlice.reducer;