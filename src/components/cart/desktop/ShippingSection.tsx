import { motion, AnimatePresence } from "framer-motion";
import { Truck, ChevronDown, ChevronUp } from "lucide-react";
import ShippingCalculator from "@/components/cart/desktop/ShippingCalculator";
import { ShippingOption } from "@/types/cart";

interface ShippingSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  options: ShippingOption[];
  selectedOption: ShippingOption | null;
  onSelectOption: (option: ShippingOption) => void;
  formatPrice: (price: number) => string;
}

export default function ShippingSection({
  isExpanded,
  onToggle,
  options,
  selectedOption,
  onSelectOption,
  formatPrice
}: ShippingSectionProps) {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center pb-3 font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors"
      >
        <div className="flex items-center">
          <Truck className="h-4 w-4 mr-2" />
          <span>Calcular envío</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden py-4 border-t border-black/10"
          >
            <ShippingCalculator
              options={options}
              selectedOption={selectedOption}
              onSelect={onSelectOption}
              formatPrice={formatPrice}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}