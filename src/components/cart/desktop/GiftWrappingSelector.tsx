
import Image from "next/image";
import { motion } from "framer-motion";

interface GiftWrappingOption {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface GiftWrappingSelectorProps {
  options: GiftWrappingOption[];
  selectedOption: GiftWrappingOption | null;
  onSelect: (option: GiftWrappingOption | null) => void;
  formatPrice: (price: number) => string;
}

export default function GiftWrappingSelector({
  options,
  selectedOption,
  onSelect,
  formatPrice
}: GiftWrappingSelectorProps) {
  return (
    <div className="mt-4 mb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ y: -2 }}
            className={`
              border p-3 cursor-pointer transition-colors
              ${selectedOption?.id === option.id 
                ? 'border-black bg-black/5' 
                : 'border-black/10 hover:border-black/30'
              }
            `}
            onClick={() => onSelect(selectedOption?.id === option.id ? null : option)}
          >
            <div className="relative h-24 w-full mb-2 bg-white">
              <Image
                src={option.image}
                alt={option.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-univers-next text-xs">{option.name}</h4>
                <p className="font-univers-next text-[10px] text-zariablack/70">
                  {formatPrice(option.price)}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full border border-black flex items-center justify-center
                ${selectedOption?.id === option.id ? 'bg-black' : 'bg-white'}
              `}>
                {selectedOption?.id === option.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button
        className="mt-3 font-univers-next text-xs text-zariablack hover:text-zaria-hover-aquamarina transition-colors"
        onClick={() => onSelect(null)}
      >
        {selectedOption ? 'Quitar envoltorio' : 'No usar envoltorio premium'}
      </button>
    </div>
  );
}