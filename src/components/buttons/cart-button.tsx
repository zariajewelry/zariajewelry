"use client"

import { BsHandbag } from "react-icons/bs";
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/store/hook"
import { openCart } from "@/store/slices/uiSlice"





interface CartButtonProps {
  className?: string
}

export default function CartButton({ className }: CartButtonProps) {
  const dispatch = useDispatch();
  const itemCount = useAppSelector(state => state.cart.items.reduce(
    (total, item) => total + item.quantity, 0
  ));

  return (
    <button
      onClick={() => dispatch(openCart())}
      className={`relative hover:text-zaria transition-colors cursor-pointer ${className}`}
      aria-label="Ver carrito"
    >
      <BsHandbag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-zaria text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}

