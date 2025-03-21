"use client";

import CartSidebarOrderSummary from "@/components/cart/sidebar/sections/CartSummary";
import { useAppSelector } from "@/store/hook";


export default function OrderSummaryContainer() {
  // Obtener datos de los diferentes slices
  const { items } = useAppSelector(state => state.cart);
  const { discount } = useAppSelector(state => state.promo);
  const { cost: shippingCost, isFreeShipping } = useAppSelector(state => state.shipping);
  
  // Calcular valores
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  const shipping = isFreeShipping ? 0 : shippingCost;
  const tax = subtotal * 0.21;
  const total = subtotal + shipping + tax - discount;

  // Función para formatear precios
  const formatPrice = (price: number) => {
    return `$ ${price.toFixed(2)}`;
  };
  
  return (
    <CartSidebarOrderSummary
      subtotal={subtotal}
      formatPrice={formatPrice}
    />
  );
}