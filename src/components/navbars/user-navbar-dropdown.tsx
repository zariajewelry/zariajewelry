"use client";

import { RefObject, useRef } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "@/hooks/use-click-outside";

type UserDropdownProps = {
  isOpen: boolean;
  toggleOpen: () => void;
  isScrolled?: boolean;
  className?: string;
};

export function UserDropdown({
  isOpen,
  toggleOpen,
  isScrolled = false,
  className,
}: UserDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () => {
    if (isOpen) toggleOpen();
  });
  
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Opciones de cuenta"
        className={cn(
          "relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center text-black",
          isOpen && "text-zaria"
        )}
      >
        <UserRound className="h-5 w-5" style={{ marginTop: "-1px" }} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}    
          transition={{ 
            type: "spring",               
            stiffness: 400,               
            damping: 25,                 
            mass: 2,                   
            opacity: { duration: 0.15 }   
          }}
          className="absolute right-0 mt-2 w-64 origin-top-right bg-white shadow-lg ri focus:outline-none z-50"
          style={{ top: "calc(100% + 10px)" }}
        >
            <div className="p-4 flex flex-col space-y-4">
              <Link href="/auth/signin">
                <button className="w-full h-9 bg-black hover:bg-zaria text-white text-sm font-medium cursor-pointer transition-colors duration-200 py-2 px-4">
                  Iniciar Sesión
                </button>
              </Link>
              <div className="text-center text-gray-600">
                <span className="text-sm">¿No tienes cuenta? </span>
                <Link href="/auth/signup" className="text-zaria hover:underline font-medium text-sm">
                  Regístrate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}