import { useEffect } from "react";




export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof document === "undefined") return;
    
    const originalOverflow = document.body.style.overflow; 

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow; 
    };
  }, [isLocked]);
};
