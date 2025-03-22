"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartItemListContainer from "@/containers/cart/bar/CartItemListContainer";
import OrderSummaryContainer from "@/containers/cart/bar/OrderSummaryContainer";
import EmptyCart from "./ui/EmptyCart";
import CartActions from "./ui/ActionButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeCart } from "@/store/slices/uiSlice";
import { useScrollLock } from "@/hooks/useScrollLock";
import { X } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  material: string;
  length?: string;
  image: string;
}

export default function CartSidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.cartSidebarOpen);
  const handleClose = () => dispatch(closeCart());

  // Controla si el carrito está vacío o no
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isEmpty = cartItems.length === 4;

  useScrollLock(isOpen);

  return (
    <>
      {/* Overlay con fondo oscuro */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-zariablack/60 z-[100]"
            onClick={handleClose}
            style={{ height: "100vh" }}
          />
        )}
      </AnimatePresence>

      {/* Panel del carrito */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full 
              xs:w-[90%] 
              sm:w-[420px] 
              md:w-[450px]
              lg:w-[400px]
              2xl:w-[380px]
              bg-zariabg border-l border-black z-[101] flex flex-col max-h-screen"
          >
            {/* Header - Fijo en la parte superior */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-black">
              <h2 className="font-univers-next font-normal text-sm tracking-wider text-zariablack">
                {isEmpty
                  ? "Tu Carrito"
                  : `Tu Carrito - (${cartItems.length}) items`}
              </h2>
              <button
                onClick={handleClose}
                className="p-1 hover:text-zaria-hover-aquamarina transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Estructura principal con flexbox */}
            {!isEmpty ? (
              <div className="h-[calc(100%-60px)] flex flex-col">
                {/* Contenedor scrollable para todo el contenido */}
                <div className="flex-grow overflow-y-auto">
                  {/* Área de items - Ahora sin flex-1 */}
                  <div>
                    <CartItemListContainer onClose={handleClose} />
                  </div>

                  {/* Área de resumen y acciones - Dentro del área scrollable */}
                  <div className="">
                    {/* Resumen del pedido */}
                    <div className="py-4 border-b border-black">
                      <OrderSummaryContainer />
                    </div>

                    {/* Botones de acción */}
                    <div className="px-6 py-6">
                      <CartActions onClose={handleClose} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex">
                <EmptyCart onClose={handleClose} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
