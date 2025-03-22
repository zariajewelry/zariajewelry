import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, GiftWrapping } from '@/types/cart';

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
      image: "https://acdn-us.mitiendanube.com/stores/001/810/105/products/vv-pulsera-ga-plata-nacarado-1b-78a3c49d2327e35aef17374911288953-1024-1024.webp",
    },
    {
      id: 2,
      name: "Collar Celestial",
      price: 1890,
      originalPrice: 2100,
      quantity: 1,
      material: "Oro Rosa",
      length: "40cm",
      image: "https://acdn-us.mitiendanube.com/stores/001/810/105/products/vv-pulsera-ga-plata-nacarado-1b-78a3c49d2327e35aef17374911288953-1024-1024.webp",
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
    
    // Nueva acción para asociar un envoltorio a un producto específico
    applyGiftWrapping: (
      state, 
      action: PayloadAction<{ 
        itemId: number; 
        wrapping: GiftWrapping | null 
      }>
    ) => {
      const { itemId, wrapping } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        item.selectedWrapping = wrapping;
      }
    }
  },
});

export const { 
  addItem, 
  updateQuantity, 
  removeItem, 
  clearCart, 
  applyGiftWrapping 
} = cartSlice.actions;

export default cartSlice.reducer;