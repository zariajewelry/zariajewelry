import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import PromoCodeInput from "@/components/cart/desktop/PromoCodeInput";

interface PromoCodeSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  code: string;
  onChange: (code: string) => void;
  onApply: (code: string) => boolean;
  discount: number;
}

export default function PromoCodeSection({
  isExpanded,
  onToggle,
  code,
  onChange,
  onApply,
  discount
}: PromoCodeSectionProps) {
  return (
    <div className="mb-6 border-t border-black/10 pt-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center pb-3 font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors"
      >
        <div className="flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          <span>Código promocional</span>
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
            className="overflow-hidden pt-4 border-t border-black/10"
          >
            <PromoCodeInput
              value={code}
              onChange={onChange}
              onApply={onApply}
              discount={discount}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}