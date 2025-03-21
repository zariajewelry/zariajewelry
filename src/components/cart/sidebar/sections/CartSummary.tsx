"use client";

interface OrderSummaryProps {
  subtotal: number;
  formatPrice: (price: number) => string;
}

export default function CartSidebarOrderSummary({
  subtotal,
  formatPrice,
}: OrderSummaryProps) {
  return (
    <div className="w-full px-3">

      {/* Subtotal */}
      <div className="flex justify-between items-center border-b border-black/10 pb-3 mb-3">
        <span className="font-univers-next text-sm text-zariablack">Subtotal</span>
        <span className="font-univers-next text-sm font-medium text-zariablack">
          {formatPrice(subtotal)}
        </span>
      </div>
      
      {/* Nota sobre impuestos y envío */}
      <p className="font-univers-next text-[10px] text-zariablack/70 italic">
        Impuestos incluidos y envío calculado en el checkout.
      </p>
    </div>
  );
}