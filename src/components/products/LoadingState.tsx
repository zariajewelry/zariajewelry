
import ProductSkeleton from "./ProductSkeleton";

interface LoadingStateProps {
  count?: number;
}

export default function LoadingState({ count = 8 }: LoadingStateProps) {
  return (
    <div>
      <div className="skeleton h-5 w-40 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8 mb-12">
        {Array(count).fill(0).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}