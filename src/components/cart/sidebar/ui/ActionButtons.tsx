"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CartActionsProps {
  onClose: () => void;
}

export default function CartActions({ onClose }: CartActionsProps) {
  return (
    <div className="space-y-2 md:space-y-2 lg:space-y-1.5 2xl:space-y-3">
      <Link href="/checkout" className="block w-full">
        <Button className="w-full bg-black hover:bg-zaria text-white transition-colors duration-300 h-10 md:h-11 lg:h-10 2xl:h-12 text-xs sm:text-sm lg:text-[12px] 2xl:text-sm font-medium cursor-pointer">
            INICIAR COMPRA
        </Button>
      </Link>
      <Button
        variant="outline"
        className="w-full border-gray-200 hover:bg-zaria/10 h-10 md:h-11 lg:h-10 2xl:h-12 lg:mb-2 text-xs sm:text-sm lg:text-[12px] 2xl:text-sm cursor-pointer"
        onClick={onClose}
      >
        CONTINUAR COMPRANDO
      </Button>
    </div>
  );
}