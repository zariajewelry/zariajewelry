"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BsHandbag } from "react-icons/bs";
import { Product } from "@/types/products";
import { getHoverImage, getMainImage } from "@/utils/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductCard({ product, index = 0 }: ProductCardProps) {
  const mainImage = getMainImage(product);
  const hoverImage = getHoverImage(product);

  return (
    <div className="bg-productcard overflow-hidden cursor-pointer relative isolate">
      {/* Contenedor de imagen con margen de 20px en los laterales y arriba */}
      <div className="relative pt-[10px] px-[10px] overflow-hidden">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f7]">
            <Image
              src={mainImage?.url || "/placeholder.svg"}
              alt={mainImage?.altText || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ${
                !hoverImage ? "group-hover:scale-[1.08]" : "group-hover:scale-[1.03]"
              } z-10`}
              priority={index < 4}
            />

            {/* Imagen hover (condicional) */}
            {hoverImage && (
              <Image
                src={hoverImage.url}
                alt={hoverImage.altText || `${product.name} - Vista alternativa`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
              />
            )}
          </div>
        </Link>

      {/* Badges - Reposicionados a la esquina superior derecha */}
      <div className="absolute top-[0px] left-[0px] flex flex-col gap-0.5 z-40">
          {product.isNew && (
            <div className="flex justify-center items-center w-[50px] h-[30px] bg-emerald-700 hover:bg-zaria text-white font-playfair font-light text-xs ">
              NUEVO
            </div>
          )}
          {product.discountPercentage && (
            <div className="w-[50px] h-[30px] flex justify-center items-center bg-productcard-sale-badge hover:productcard-sale-badge text-white font-playfair font-light text-xs">
              SALE
            </div>
          )}
        </div>

        {/* Botones de acción - misma funcionalidad */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0 z-50">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              className="bg-zaria text-white hover:bg-zaria/80 rounded-none shadow-md mx-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Lógica para añadir al carrito
              }}
            >
              <BsHandbag className="h-5 w-5 mr-1" />
              Añadir
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              className="border-none bg-zaria text-white hover:bg-zaria/80 rounded-none mx-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>

        {/* Estado de stock */}
        {!product.isInStock && (
          <div className="absolute inset-0 top-[20px] left-[20px] right-[20px] bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-30">
            <span className="bg-white/95 text-black px-5 py-2 text-xs tracking-wide font-medium rounded">
              Próximamente
            </span>
          </div>
        )}
      </div>

      {/* Información del producto - centrada */}
      <div className="p-4 text-center">
        <Link
          href={`/products/${product.id}`}
          className="block group-hover:text-black/80 transition-colors duration-300"
        >
          <h3 className="font-lato font-light text-xs lg:text-[11px] tracking-tight mb-1 leading-tight">
            {product.name.toLocaleUpperCase()}
          </h3>
        </Link>

        {/* Precio - centrado */}
        <div className="flex justify-center">
          {product.originalPrice ? (
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-red-500 font-lato text-xs">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-gray-400 line-through font-lato text-xs">
                ${product.originalPrice.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="font-lato text-xs">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);