"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
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
      {/* Contenedor de imagen con margen de 10px en los laterales y arriba */}
      <div className="relative pt-[12px] px-[12px] overflow-hidden">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f7]">
            <Image
              src={mainImage?.url || "/placeholder.svg"}
              alt={mainImage?.altText || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ${
                !hoverImage
                  ? "group-hover:scale-[1.08]"
                  : "group-hover:scale-[1.03]"
              } z-10`}
              priority={index < 4}
            />

            {/* Imagen hover (condicional) */}
            {hoverImage && (
              <Image
                src={hoverImage.url}
                alt={
                  hoverImage.altText || `${product.name} - Vista alternativa`
                }
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
            <div className="flex justify-center items-center w-[50px] h-[30px] bg-zaria-salmon text-white font-archivo font-light text-xs ">
              NUEVO
            </div>
          )}
          {product.discountPercentage && (
            <div className="w-[50px] h-[30px] flex justify-center items-center bg-zaria-aquamarina text-white font-archivo font-light text-xs">
              SALE
            </div>
          )}
        </div>

        <motion.div
          className="absolute top-[20px] right-[14px] z-40 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart
            className="w-6 h-6 lg:h-8 lg:w-8 text-white hover:text-zaria-salmon/80 transition-colors"
            strokeWidth={1} // Reduce el grosor del trazo
          />
        </motion.div>

        {/* Botones de acción - misma funcionalidad */}
        <div className="hidden md:absolute bottom-4 left-0 right-0 md:flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0 z-50">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button
              className="w-[70px] h-[40px] flex justify-center items-center text-white bg-zaria-salmon hover:bg-zaria-salmon/80 rounded-none mx-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Lógica para añadir al carrito
              }}
            >
              <BsHandbag className="h-6 w-6 " />
            </button>
          </motion.div>
        </div>

        {/* Estado de stock */}
        {!product.isInStock && (
          <div className="absolute inset-0 top-[10px] left-[10px] right-[10px] bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-30">
            <span className="text-black px-5 py-2 border text-xs sm:text-sm tracking-wide font-archivo font-medium">
              Próximamente
            </span>
          </div>
        )}
      </div>

      {/* Información del producto - con nombre a la izquierda y precio a la derecha */}
      <div className="p-4 flex justify-between items-center">
        <Link
          href={`/products/${product.id}`}
          className="block group-hover:text-black/80 transition-colors duration-300"
        >
          <h3 className="font-archivo font-light text-[10px] lg:text-xs text-zariablack tracking-tight leading-tight text-left">
            {product.name.toLocaleUpperCase()}
          </h3>
        </Link>

        {/* Precio - alineado a la derecha */}
        <div className="flex items-end gap-1.5">
          {product.originalPrice ? (
            <>
              <span className="text-red-500 font-archivo text-[10px] lg:text-xs">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-gray-800 line-through font-archivo text-[10px] lg:text-xs">
                ${product.originalPrice.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-archivo text-[10px] lg:text-xs text-right">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
