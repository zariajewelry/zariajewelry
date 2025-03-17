import { ImageType, Product, ProductImage } from "@/types/products";


export function getMainImage(product: Product): ProductImage | undefined {
    return product.images.find(img => img.type === ImageType.MAIN && img.isActive);
  }
  
  export function getHoverImage(product: Product): ProductImage | undefined {
    return product.images.find(img => img.type === ImageType.HOVER && img.isActive);
  }
  
  export function getGalleryImages(product: Product): ProductImage[] {
    return product.images
      .filter(img => img.type === ImageType.GALLERY && img.isActive)
      .sort((a, b) => a.order - b.order);
  }