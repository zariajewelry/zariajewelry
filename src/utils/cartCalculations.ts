import { CartItem, CartSummary } from "@/types/cart";




export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}


export function calculateShipping(subtotal: number, freeShippingThreshold: number = 1000): number {
  return subtotal >= freeShippingThreshold ? 0 : 15;
}


export function calculateTax(subtotal: number, taxRate: number = 0.21): number {
  return subtotal * taxRate;
}


export function calculateCartSummary(
  items: CartItem[], 
  discount: number = 0, 
  giftBagCost: number = 0,
  freeShippingThreshold: number = 1000,
  taxRate: number = 0.21
): CartSummary {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal, freeShippingThreshold);
  const tax = calculateTax(subtotal, taxRate);
  
  return {
    subtotal,
    discount,
    shipping,
    tax,
    giftBagCost,
    total: subtotal + shipping + tax + giftBagCost - discount
  };
}