
export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  material: string;
  length?: string;
  image: string;
  selectedWrapping?: GiftWrapping | null;
}


export interface GiftBag {
  id: number;
  name: string;
  description: string;
  price: number;
  selected: boolean;
  image: string;
}


export interface PromoCodeState {
  code: string;
  applied: boolean;
  discount: number;
  isOpen: boolean;
}


export interface ShippingState {
  postalCode: string;
  calculated: boolean;
  cost: number;
  isOpen: boolean;
}


export interface CartSummary {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  giftBagCost: number;
  total: number;
}


export interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface GiftWrapping {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}
