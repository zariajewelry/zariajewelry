import { Plus, Minus } from "lucide-react";

interface QuantityAdjusterProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function CartQuantityAdjuster({ 
  quantity, 
  onIncrease, 
  onDecrease 
}: QuantityAdjusterProps) {
  return (
    <div className="flex items-center border border-black/10">
      <button 
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-1 hover:text-zaria-hover-aquamarina transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <Minus className="h-3 w-3" />
      </button>
      
      <div className="w-8 text-center font-univers-next text-sm">
        {quantity}
      </div>
      
      <button 
        onClick={onIncrease}
        className="p-1 hover:text-zaria-hover-aquamarina transition-colors"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}