import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GiftBag } from '@/types/cart';

interface GiftBagState {
  bags: GiftBag[];
  currentBagIndex: number;
  isOpen: boolean;
}

const initialState: GiftBagState = {
  bags: [
    {
      id: 1,
      name: "¡Quiero una bolsa elegante!",
      description: "Bolsa premium con diseño sofisticado y lazo de satén",
      price: 0,
      selected: false,
      image:
        "https://www.ginifab.com/custom_boxes/img/paper_bracelet_box_1.jpg",
    },
    {
      id: 2,
      name: "¡Quiero una caja de regalo!",
      description: "Caja forrada en tela con acabado sedoso",
      price: 380,
      selected: false,
      image:
        "https://ar.isadoraonline.com/media/catalog/product/4/5/45389802_0_1_20230303210200.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=985&width=770&canvas=770:985",
    },
    {
      id: 3,
      name: "¡Quiero un envoltorio especial!",
      description: "Papel de seda y cinta personalizada ZARIA",
      price: 190,
      selected: false,
      image:
        "https://ar.isadoraonline.com/media/catalog/product/4/5/45389802_0_1_20230303210200.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=985&width=770&canvas=770:985",
    },
  ],
  currentBagIndex: 0,
  isOpen: false,
};

export const giftBagSlice = createSlice({
  name: 'giftBag',
  initialState,
  reducers: {
    toggleGiftBagSection: (state) => {
      state.isOpen = !state.isOpen;
    },
    nextBag: (state) => {
      state.currentBagIndex = (state.currentBagIndex + 1) % state.bags.length;
    },
    previousBag: (state) => {
      state.currentBagIndex = state.currentBagIndex === 0 
        ? state.bags.length - 1 
        : state.currentBagIndex - 1;
    },
    toggleGiftBag: (state, action: PayloadAction<number>) => {
      const bagId = action.payload;
      state.bags = state.bags.map(bag => ({
        ...bag,
        selected: bag.id === bagId ? !bag.selected : false
      }));
    }
  },
});

// Exportar acciones
export const { toggleGiftBagSection, nextBag, previousBag, toggleGiftBag } = giftBagSlice.actions;

export default giftBagSlice.reducer;