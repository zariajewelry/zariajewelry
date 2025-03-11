import { cn } from "@/lib/utils"

interface ArtisticDividerProps {
  className?: string
}

export default function ArtisticDivider({ className }: ArtisticDividerProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <div className="h-px w-8 bg-gray-300"></div>
      <div className="h-[2px] w-16 bg-[#81D8D0]"></div>
      <div className="h-px w-8 bg-gray-300"></div>
    </div>
  )
}

