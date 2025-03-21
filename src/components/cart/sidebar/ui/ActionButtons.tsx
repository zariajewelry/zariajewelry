"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

interface CartActionsProps {
  onClose: () => void;
}

export default function CartActions({ onClose }: CartActionsProps) {
  return (
    <div className="space-y-3">
      {/* Botón de iniciar compra */}
      <Link href="/checkout" className="block w-full">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-full mb-3 h-9 text-zariablack font-univers-next font-normal text-sm tracking-wide border border-zariablack transition-all duration-300 hover:text-zaria-hover-aquamarina hover:border-zaria-hover-aquamarina cursor-pointer"
        >
          IR AL CARRITO
        </motion.button>
      </Link>
      
      {/* Botón de continuar comprando */}
      <motion.button
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={onClose}
        className="w-full mb-4 flex items-center justify-center font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors group cursor-pointer"
      >
        <span className="relative text-xs font-univers-next font-normal">
          CONTINUAR COMPRANDO
          <MoveRight className="inline-block h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
          <span className="absolute -bottom-[3px] left-0 w-full h-[1px] bg-zariablack group-hover:bg-zaria-hover-aquamarina transition-colors"></span>
        </span>
      </motion.button>
    </div>
  );
}