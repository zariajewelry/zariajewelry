import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types/cart';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [
    {
      id: 1,
      name: "Collar Eternity",
      price: 2450,
      quantity: 1,
      material: "Oro Blanco",
      length: "45cm",
      image: "/placeholder.svg?height=200&width=200&text=Collar+Eternity",
    },
    {
      id: 2,
      name: "Collar Celestial",
      price: 1890,
      originalPrice: 2100,
      quantity: 1,
      material: "Oro Rosa",
      length: "40cm",
      image: "/placeholder.svg?height=200&width=200&text=Collar+Celestial",
    },
  ],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    // En una aplicación real, aquí tendríamos acciones asíncronas para sincronizar con el backend
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;