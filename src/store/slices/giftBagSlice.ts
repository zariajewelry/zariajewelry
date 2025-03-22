import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GiftWrapping } from '@/types/cart';

// Renombramos a GiftWrappingState para mayor claridad
interface GiftWrappingState {
  // Consideramos estas como opciones de productos disponibles
  options: GiftWrapping[];
  
  // Para UI, mantener qué sección está abierta
  isOpen: boolean;
  
  // Stock provisional (en futuro vendrá de API)
  stockByWrappingId: Record<number, number>;
}

const initialState: GiftWrappingState = {
  options: [
    {
      id: 1,
      name: "Bolsa elegante",
      description: "Bolsa premium con diseño sofisticado y lazo de satén",
      price: 0,
      image: "https://www.ginifab.com/custom_boxes/img/paper_bracelet_box_1.jpg",
      // Removemos "selected" porque ahora es por producto en cartSlice
    },
    {
      id: 2,
      name: "Caja de regalo",
      description: "Caja forrada en tela con acabado sedoso",
      price: 380,
      image: "https://ar.isadoraonline.com/media/catalog/product/4/5/45389802_0_1_20230303210200.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=985&width=770&canvas=770:985",
    },
    {
      id: 3,
      name: "Envoltorio especial",
      description: "Papel de seda y cinta personalizada ZARIA",
      price: 190,
      image: "https://ar.isadoraonline.com/media/catalog/product/4/5/45389802_0_1_20230303210200.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=985&width=770&canvas=770:985",
    },
  ],
  isOpen: false,
  // Valores iniciales de stock (simulados)
  stockByWrappingId: {
    1: 100,
    2: 50,
    3: 75
  }
};

export const giftWrappingSlice = createSlice({
  name: 'giftWrapping',
  initialState,
  reducers: {
    // Mantenemos solo la acción para abrir/cerrar el selector
    toggleGiftWrappingSection: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    // Añadimos acciones que simularán interacciones con API/BD
    fetchGiftWrappingOptions: (state, action: PayloadAction<GiftWrapping[]>) => {
      // Esto será útil cuando obtengas datos reales de tu API
      state.options = action.payload;
    },
    
    updateGiftWrappingStock: (state, action: PayloadAction<{id: number, stock: number}>) => {
      // Para actualizar el stock cuando se consuma
      const { id, stock } = action.payload;
      state.stockByWrappingId[id] = stock;
    },
    
    // Simulación de compra (para testing)
    decrementStock: (state, action: PayloadAction<{id: number, quantity: number}>) => {
      const { id, quantity } = action.payload;
      if (state.stockByWrappingId[id]) {
        state.stockByWrappingId[id] = Math.max(0, state.stockByWrappingId[id] - quantity);
      }
    }
  },
});

// Exportar acciones
export const { 
  toggleGiftWrappingSection, 
  fetchGiftWrappingOptions,
  updateGiftWrappingStock,
  decrementStock
} = giftWrappingSlice.actions;

export default giftWrappingSlice.reducer;