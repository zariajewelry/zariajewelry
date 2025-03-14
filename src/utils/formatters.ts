
export function formatPrice(price: number): string {
  return `${price.toFixed(2)}€`;
}


export function formatDiscount(originalPrice: number, currentPrice: number): string {
  const discountPercent = Math.round((1 - currentPrice / originalPrice) * 100);
  return `-${discountPercent}%`;
}


export function formatReferenceCode(id: number, length: number = 4): string {
  return id.toString().padStart(length, "0");
}