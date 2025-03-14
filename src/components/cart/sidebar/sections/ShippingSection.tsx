"use client";

import { Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShippingSectionProps {
  postalCode: string;
  calculated: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onPostalCodeChange: (code: string) => void;
  onCalculateShipping: () => void;
}

export default function ShippingSection({
  postalCode,
  calculated,
  isOpen,
  onToggle,
  onPostalCodeChange,
  onCalculateShipping,
}: ShippingSectionProps) {
  return (
    <div className="overflow-hidden bg-transparent">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left cursor-pointer py-1 sm:py-1 lg:py-0.5 xl:py-1"
        aria-expanded={isOpen}
        aria-controls="shipping-calc-input"
      >
        <div className="flex items-center">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3 lg:h-3 xl:w-4 xl:h-4 mr-1.5 sm:mr-2 text-gray-400">
            <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3 lg:h-3 xl:w-4 xl:h-4" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-serif text-xs sm:text-xs lg:text-[9px] xl:text-xs tracking-wide">
                Calcular Envío
              </span>
              {calculated && (
                <span className="ml-1.5 text-[9px] sm:text-[9px] lg:text-[7px] xl:text-[9px] text-zaria">
                  • Calculado
                </span>
              )}
            </div>
            <p className="text-[9px] sm:text-[9px] lg:text-[7px] xl:text-[9px] text-gray-400 leading-tight">
              Costo según tu ubicación
            </p>
          </div>
        </div>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Campo de código postal colapsable */}
      <div
        id="shipping-calc-input"
        className={`transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "max-h-[50px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}
      >
        <div className="ml-5 sm:ml-6 lg:ml-4 xl:ml-6 flex items-center">
          <Input
            value={postalCode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
            placeholder="Introduce tu código postal"
            disabled={calculated}
            className={cn(
              "text-[10px] lg:text-[9px] xl:text-xs h-8 sm:h-7 lg:h-8 xl:h-8 mr-2 rounded-l border-gray-200 focus-visible:ring-zaria focus-visible:border-zaria",
              calculated && "bg-gray-50 text-gray-500"
            )}
          />
          <Button
            onClick={onCalculateShipping}
            disabled={calculated || !postalCode}
            variant="outline"
            className="h-8 sm:h-7 lg:h-8 xl:h-8 rounded-l-none border-gray-200 hover:bg-zaria/10 hover:border-zaria hover:text-zaria transition-all duration-200 text-[10px] lg:text-[9px] xl:text-xs px-2 sm:px-3 lg:px-1 xl:px-3 cursor-pointer"
          >
            Calcular
          </Button>
        </div>
      </div>
    </div>
  );
}