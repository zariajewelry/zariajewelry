import { useState } from "react";
import { motion } from "framer-motion";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

interface ShippingCalculatorProps {
  options: ShippingOption[];
  selectedOption: ShippingOption | null;
  onSelect: (option: ShippingOption) => void;
  formatPrice: (price: number) => string;
}

export default function ShippingCalculator({
  options,
  selectedOption,
  onSelect,
  formatPrice
}: ShippingCalculatorProps) {
  const [postalCode, setPostalCode] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  
  const handleCalculate = () => {
    if (!postalCode) return;
    
    setIsCalculating(true);
    // Simular una llamada a la API
    setTimeout(() => {
      setIsCalculating(false);
      setShowOptions(true);
    }, 800);
  };
  
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Código postal"
          className="flex-1 border border-black/10 p-2 font-univers-next text-sm focus:border-zaria-hover-aquamarina focus:ring-0 outline-none"
        />
        <button
          onClick={handleCalculate}
          disabled={!postalCode || isCalculating}
          className="px-4 py-2 bg-zariablack text-white font-univers-next text-xs tracking-wide transition-colors hover:bg-zaria-purple disabled:bg-black/20"
        >
          {isCalculating ? "..." : "Calcular"}
        </button>
      </div>
      
      {showOptions && (
        <div className="space-y-3">
          {options.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                border p-3 cursor-pointer transition-colors
                ${selectedOption?.id === option.id 
                  ? 'border-black bg-black/5' 
                  : 'border-black/10 hover:border-black/30'
                }
              `}
              onClick={() => onSelect(option)}
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-univers-next text-sm">{option.name}</h4>
                  <p className="font-univers-next text-xs text-zariablack/70">
                    {option.description}
                  </p>
                  <p className="font-univers-next text-xs text-zariablack/70 mt-1">
                    {option.estimatedDelivery}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-univers-next text-sm">
                    {option.price === 0 ? "Gratis" : formatPrice(option.price)}
                  </span>
                  <div className={`mt-1 w-4 h-4 rounded-full border border-black flex items-center justify-center
                    ${selectedOption?.id === option.id ? 'bg-black' : 'bg-white'}
                  `}>
                    {selectedOption?.id === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}