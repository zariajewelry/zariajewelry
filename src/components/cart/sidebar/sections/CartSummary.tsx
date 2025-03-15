"use client";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  formatPrice: (price: number) => string;
}

export default function CartSidebarOrderSummary({
  subtotal,
  discount,
  shipping,
  tax,
  total,
  formatPrice,
}: OrderSummaryProps) {
  return (
    <>
      <div className="space-y-1 md:space-y-1.5 lg:space-y-0.5 2xl:space-y-2 text-xs sm:text-sm lg:text-[11px] 2xl:text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-zaria">
            <span>Descuento</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>
          <span>
            {shipping === 0 ? (
              <span className="text-zaria">Gratis</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">IVA (21%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>
      <div className="flex justify-between font-medium mb-0 pt-3 border-t border-gray-200 mt-2">
        <span>Total</span>
        <span className="text-base sm:text-lg lg:text-sm 2xl:text-lg">
          {formatPrice(total)}
        </span>
      </div>
    </>
  );
}
