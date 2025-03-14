import { ShippingState } from '@/types/cart';
import { useState } from 'react';


interface ShippingHookProps {
  subtotal: number;
  freeShippingThreshold?: number;
}


export function useShipping({ 
  subtotal, 
  freeShippingThreshold = 1000 
}: ShippingHookProps) {
  const [state, setState] = useState<ShippingState>({
    postalCode: '',
    calculated: false,
    cost: 0,
    isOpen: false
  });


  const isFreeShipping = subtotal >= freeShippingThreshold;
  

  const setPostalCode = (postalCode: string) => {
    setState(prev => ({ 
      ...prev, 
      postalCode,
      calculated: false 
    }));
  };


  const toggleOpen = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };


  const calculateShipping = () => {
    if (!state.postalCode) return false;
    
    // Aquí implementaríamos la lógica real de cálculo de envío
    // Por ahora usamos una lógica simple basada en envío gratuito por umbral
    const shippingCost = isFreeShipping ? 0 : 15; // 15€ es el costo por defecto
    
    setState(prev => ({ 
      ...prev, 
      calculated: true,
      cost: shippingCost
    }));
    
    return true;
  };

  const resetShipping = () => {
    setState(prev => ({
      ...prev,
      calculated: false,
      cost: 0
    }));
  };

  return {
    postalCode: state.postalCode,
    isCalculated: state.calculated,
    shippingCost: state.cost,
    isFreeShipping,
    isOpen: state.isOpen,
    setPostalCode,
    toggleOpen,
    calculateShipping,
    resetShipping
  };
}