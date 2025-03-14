"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyCartProps {
  onClose: () => void;
}

export default function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-6">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
        <ShoppingBag className="w-full h-full text-gray-200" />
      </div>
      <h3 className="font-serif text-lg sm:text-xl mb-2">
        Tu carrito está vacío
      </h3>
      <p className="text-gray-500 mb-4 sm:mb-6 max-w-xs">
        Descubre nuestros collares y encuentra tu próximo favorito.
      </p>
      <Button
        onClick={onClose}
        className="bg-zaria hover:bg-zaria/90 text-white px-6"
      >
        Explorar Productos
      </Button>
    </div>
  );
}