"use client";

import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface EmptyCartProps {
  onClose?: () => void;
}

export default function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 sm:p-8">
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="font-vollkorn font-semibold text-base tracking-wider text-zariablack mb-3"
      >
        TU CARRITO ESTÁ VACÍO
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="font-univers-next font-normal text-xs text-zariablack/70 mb-8 max-w-xs"
      >
        Descubre nuestra colección de joyas exclusivas y encuentra tu próxima pieza favorita.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link 
          href="/products" 
          onClick={onClose}
          className="inline-flex items-center font-univers-next text-sm font-normal text-zariablack hover:text-zaria-hover-aquamarina group cursor-pointer"
        >
          <span className="relative flex items-center">
            <span>EXPLORAR PRODUCTOS</span>
            <MoveRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
            <span className="absolute -bottom-[3px] left-0 w-full h-[1px] bg-zariablack group-hover:bg-zaria-hover-aquamarina transition-colors"></span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}