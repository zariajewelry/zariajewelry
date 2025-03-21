import { useState } from "react";
import { Check, X } from "lucide-react";

interface PromoCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onApply: (code: string) => boolean;
  discount: number;
}

export default function PromoCodeInput({
  value,
  onChange,
  onApply,
  discount
}: PromoCodeInputProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  const handleApply = () => {
    if (!value.trim()) {
      setError("Ingresa un código promocional");
      return;
    }
    
    const isValid = onApply(value);
    
    if (isValid) {
      setSuccess(true);
      setError(null);
    } else {
      setError("Código promocional inválido");
      setSuccess(false);
    }
  };
  
  const handleClear = () => {
    onChange("");
    setError(null);
    setSuccess(false);
  };
  
  return (
    <div>
      {success ? (
        <div className="flex items-center justify-between bg-black/5 p-3 border border-black/10">
          <div className="flex items-center">
            <Check className="h-4 w-4 text-zaria-hover-aquamarina mr-2" />
            <div>
              <span className="font-univers-next text-sm">{value.toUpperCase()}</span>
              <span className="ml-2 font-univers-next text-xs text-zaria-hover-aquamarina">
                ({discount * 100}% descuento)
              </span>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="text-zariablack/50 hover:text-zaria-hover-aquamarina transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setError(null);
              }}
              placeholder="Código promocional"
              className="flex-1 border border-black/10 p-2 font-univers-next text-sm focus:border-zaria-hover-aquamarina focus:ring-0 outline-none uppercase"
            />
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-zariablack text-white font-univers-next text-xs tracking-wide transition-colors hover:bg-zaria-purple"
            >
              Aplicar
            </button>
          </div>
          {error && (
            <p className="mt-2 font-univers-next text-xs text-red-500">
              {error}
            </p>
          )}
          <p className="mt-2 font-univers-next text-xs text-zariablack/70 italic">
            Prueba con el código ZARIA20 para obtener un 20% de descuento
          </p>
        </>
      )}
    </div>
  );
}