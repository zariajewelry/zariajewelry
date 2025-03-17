
export default function ProductSkeleton() {
  return (
    <div>
      {/* Imagen del producto */}
      <div className="skeleton aspect-[3/4] w-full mb-3" />
      
      {/* Nombre del producto */}
      <div className="skeleton h-4 w-2/3 mb-2" />
      
      {/* Precio */}
      <div className="skeleton h-3 w-1/3" />
    </div>
  );
}