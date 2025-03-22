"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hook";
import CartSummary from "@/components/cart/desktop/CartSummary";
import ShippingCalculatorContainer from "./ShippingCalculatorContainer";
import PromoCodeContainer from "./PromoCodeContainer";


interface CartSummaryContainerProps {
  formatPrice: (price: number) => string;
}

export default function CartSummaryContainer({ formatPrice }: CartSummaryContainerProps) {
  const { items } = useAppSelector(state => state.cart);
  
  // Estados locales para los valores calculados por los contenedores hijos
  const [shippingCost, setShippingCost] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  
  // Cálculos de totales
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const wrappingTotal = items.reduce(
    (sum, item) =>
      sum + (item.selectedWrapping ? item.selectedWrapping.price * item.quantity : 0),
    0
  );
  
  const discountAmount = discountRate * subtotal;
  const total = subtotal + wrappingTotal + shippingCost - discountAmount;
  
  // Handler para checkout
  const handleCheckout = () => {
    // Lógica de checkout
    alert("¡Redirigiendo al checkout!");
  };
  
  return (
    <div className="w-full">
      <div className="bg-white border border-black p-6 sticky top-32 z-10">
        <h2 className="font-vollkorn text-lg mb-6 pb-4 border-b border-black">
          Resumen del pedido
        </h2>

        {/* Contenedor de cálculo de envío */}
        <ShippingCalculatorContainer 
          formatPrice={formatPrice}
          onShippingCostChange={setShippingCost}
        />

        {/* Contenedor de código promocional */}
        <PromoCodeContainer 
          onDiscountChange={setDiscountRate}
        />

        {/* Componente de resumen */}
        <CartSummary
          subtotal={subtotal}
          wrappingTotal={wrappingTotal}
          shippingCost={shippingCost}
          discountAmount={discountAmount}
          total={total}
          formatPrice={formatPrice}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}