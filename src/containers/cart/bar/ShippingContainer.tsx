"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setPostalCode, toggleShippingSection, calculateShipping } from "@/store/slices/shippingSlice";
import ShippingSection from "@/components/cart/sidebar/sections/ShippingSection";

interface ShippingContainerProps {
  useLocalState?: boolean;
  subtotalValue?: number;
}

export default function ShippingContainer({ 
  useLocalState = false,
  subtotalValue = 0
}: ShippingContainerProps) {
  // Estado local para cuando no usamos Redux
  const [localPostalCode, setLocalPostalCode] = useState("");
  const [localCalculated, setLocalCalculated] = useState(false);
  const [localIsOpen, setLocalIsOpen] = useState(false);
  
  // Redux state
  const dispatch = useAppDispatch();
  const { postalCode, calculated, isOpen } = useAppSelector(state => state.shipping);
  
  // Subtotal desde Redux o calculado localmente
  const reduxSubtotal = useAppSelector(state => 
    state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  
  const subtotal = useLocalState ? subtotalValue : reduxSubtotal;
  
  
  // Handlers para estado local
  const handleLocalToggle = () => {
    setLocalIsOpen(!localIsOpen);
  };
  
  const handleLocalPostalCodeChange = (code: string) => {
    if (!localCalculated) {
      setLocalPostalCode(code);
    }
  };
  
  const handleLocalCalculateShipping = () => {
    if (localPostalCode && !localCalculated) {
      // En una aplicación real, aquí harías una llamada a un API
      setLocalCalculated(true);
    }
  };
  
  // Handlers para Redux
  const handleReduxToggle = () => {
    dispatch(toggleShippingSection());
  };
  
  const handleReduxPostalCodeChange = (code: string) => {
    dispatch(setPostalCode(code));
  };
  
  const handleReduxCalculateShipping = () => {
    if (postalCode && !calculated) {
      const isFreeShipping = subtotal >= 1000;
      const shippingCost = {
        cost: isFreeShipping ? 0 : 15,
        isFreeShipping
      };
      
      dispatch(calculateShipping(shippingCost));
    }
  };
  
  // Decide qué props pasar basado en si estamos usando estado local o Redux
  const sectionProps = useLocalState 
    ? {
        postalCode: localPostalCode,
        calculated: localCalculated,
        isOpen: localIsOpen,
        onToggle: handleLocalToggle,
        onPostalCodeChange: handleLocalPostalCodeChange,
        onCalculateShipping: handleLocalCalculateShipping
      }
    : {
        postalCode,
        calculated,
        isOpen,
        onToggle: handleReduxToggle,
        onPostalCodeChange: handleReduxPostalCodeChange,
        onCalculateShipping: handleReduxCalculateShipping
      };
  
  return <ShippingSection {...sectionProps} />;
}