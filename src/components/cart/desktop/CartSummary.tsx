import { motion } from "framer-motion";

interface CartSummaryProps {
  subtotal: number;
  wrappingTotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  formatPrice: (price: number) => string;
  onCheckout: () => void;
}

export default function CartSummary({
  subtotal,
  wrappingTotal,
  shippingCost,
  discountAmount,
  total,
  formatPrice,
  onCheckout
}: CartSummaryProps) {
  return (
    <div className="border-t border-black pt-4 mb-6">
      {/* Subtotal */}
      <div className="flex justify-between mb-3">
        <span className="font-univers-next text-sm text-zariablack">
          Subtotal
        </span>
        <span className="font-univers-next text-sm text-zariablack">
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* Envoltorio premium (si aplica) */}
      {wrappingTotal > 0 && (
        <div className="flex justify-between mb-3">
          <span className="font-univers-next text-sm text-zariablack">
            Envoltorios premium
          </span>
          <span className="font-univers-next text-sm text-zariablack">
            {formatPrice(wrappingTotal)}
          </span>
        </div>
      )}

      {/* Descuento (si aplica) */}
      {discountAmount > 0 && (
        <div className="flex justify-between mb-3">
          <span className="font-univers-next text-sm text-zaria-hover-aquamarina">
            Descuento
          </span>
          <span className="font-univers-next text-sm text-zaria-hover-aquamarina">
            -{formatPrice(discountAmount)}
          </span>
        </div>
      )}

      {/* Envío (si está seleccionado) */}
      <div className="flex justify-between mb-3">
        <span className="font-univers-next text-sm text-zariablack">
          Envío
        </span>
        <span className="font-univers-next text-sm text-zariablack">
          {shippingCost > 0 
            ? formatPrice(shippingCost)
            : "Calcular arriba"}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between pt-4 mt-3 border-t border-black">
        <span className="font-vollkorn text-base text-zariablack">
          TOTAL
        </span>
        <span className="font-vollkorn text-base text-zariablack">
          {formatPrice(total)}
        </span>
      </div>

      {/* Botón de checkout */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="w-full py-3 mt-6 bg-zariablack text-white font-univers-next text-sm tracking-wide border border-zariablack transition-all duration-300 hover:bg-zaria-purple hover:border-zaria-purple"
        onClick={onCheckout}
      >
        FINALIZAR COMPRA
      </motion.button>

      {/* Texto de información */}
      <p className="font-univers-next text-[10px] text-zariablack/70 italic mt-4 text-center">
        Impuestos incluidos. El envío se calcula en base a tu ubicación.
      </p>
    </div>
  );
}