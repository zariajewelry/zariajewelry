




export type FilterState = {
    categories: string[];
    materials: string[];
    priceRange: [number, number];
    availability: string[];
    discount: boolean;
    sortBy: string;
};


export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number | null;
    discountPercentage: number | null;
    images:  ProductImage[];
    category: string;
    material: string;
    reviews: number;
    isInStock: boolean;
    isNew: boolean;
    isBestseller: boolean;
  }

  export interface ProductImage {
    id: string;
    url: string;
    altText: string;
    type: ImageType;
    order: number;
    isActive: boolean;
  }

  export enum ImageType {
    MAIN = 'MAIN',
    HOVER = 'HOVER',
    GALLERY = 'GALLERY',
    THUMBNAIL = 'THUMBNAIL',
    DETAIL = 'DETAIL'
  }