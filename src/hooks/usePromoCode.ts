import { PromoCodeState } from '@/types/cart';
import { useState } from 'react';


interface PromoCodeHookProps {
  subtotal: number;
}


export function usePromoCode({ subtotal }: PromoCodeHookProps) {
  const [state, setState] = useState<PromoCodeState>({
    code: '',
    applied: false,
    discount: 0,
    isOpen: false
  });

  const setPromoCode = (code: string) => {
    setState(prev => ({ ...prev, code }));
  };
  

  const toggleOpen = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };


  const applyPromoCode = () => {
    // Verificar si el código es válido
    // Esto eventualmente debería verificarse contra una API
    if (state.code.toLowerCase() === 'luxe10') {
      const discount = subtotal * 0.1; // 10% de descuento
      setState(prev => ({ 
        ...prev, 
        applied: true,
        discount 
      }));
      return true;
    }
    
    return false;
  };


  const removePromoCode = () => {
    setState({
      code: '',
      applied: false,
      discount: 0,
      isOpen: state.isOpen
    });
  };

  return {
    promoCode: state.code,
    promoApplied: state.applied,
    discount: state.discount,
    isOpen: state.isOpen,
    setPromoCode,
    toggleOpen,
    applyPromoCode,
    removePromoCode
  };
}