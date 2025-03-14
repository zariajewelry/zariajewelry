"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setPromoCode, togglePromoSection, applyPromo } from "@/store/slices/promoSlice";
import PromoCodeSection from "@/components/cart/sidebar/sections/PromoCodeSection";

interface PromoCodeContainerProps {
  useLocalState?: boolean;
  subtotalValue?: number;
}

export default function PromoCodeContainer({ 
  useLocalState = false,
  subtotalValue = 0
}: PromoCodeContainerProps) {
  // Estado local para cuando no usamos Redux
  const [localCode, setLocalCode] = useState("");
  const [localApplied, setLocalApplied] = useState(false);
  const [localIsOpen, setLocalIsOpen] = useState(false);
  
  // Redux state
  const dispatch = useAppDispatch();
  const { code, applied, isOpen } = useAppSelector(state => state.promo);
  
  // Subtotal desde Redux o calculado localmente
  const reduxSubtotal = useAppSelector(state => 
    state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  
  const subtotal = useLocalState ? subtotalValue : reduxSubtotal;
  
  // Handlers para estado local
  const handleLocalToggle = () => {
    setLocalIsOpen(!localIsOpen);
  };
  
  const handleLocalCodeChange = (newCode: string) => {
    if (!localApplied) {
      setLocalCode(newCode);
    }
  };
  
  const handleLocalApplyPromo = () => {
    if (localCode.toLowerCase() === 'luxe10') {
      setLocalApplied(true);
      // Aquí manejarías el descuento localmente
    }
  };
  
  // Handlers para Redux
  const handleReduxToggle = () => {
    dispatch(togglePromoSection());
  };
  
  const handleReduxCodeChange = (newCode: string) => {
    if (!applied) {
      dispatch(setPromoCode(newCode));
    }
  };
  
  const handleReduxApplyPromo = () => {
    if (code.toLowerCase() === 'luxe10') {
      // 10% de descuento
      const discountAmount = subtotal * 0.1;
      dispatch(applyPromo(discountAmount));
    }
  };
  
  // Decide qué props pasar basado en si estamos usando estado local o Redux
  const sectionProps = useLocalState 
    ? {
        code: localCode,
        applied: localApplied,
        isOpen: localIsOpen,
        onToggle: handleLocalToggle,
        onCodeChange: handleLocalCodeChange,
        onApplyPromo: handleLocalApplyPromo
      }
    : {
        code,
        applied,
        isOpen,
        onToggle: handleReduxToggle,
        onCodeChange: handleReduxCodeChange,
        onApplyPromo: handleReduxApplyPromo
      };
  
  return <PromoCodeSection {...sectionProps} />;
}