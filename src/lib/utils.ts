import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeName(name: string): string {
  if (!name) return "";
  
  return name.split(/[ -]/).map(part => {
    if (['de', 'la', 'del', 'los', 'las', 'van', 'von', 'der'].includes(part.toLowerCase())) {
      return part.toLowerCase();
    }
    
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join(' ');
}
