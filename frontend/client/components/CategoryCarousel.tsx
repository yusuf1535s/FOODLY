import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { DEFAULT_FOOD_IMAGE } from "@/lib/constants";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoryCarouselProps {
  title: string;
  categories: Category[];
  selectedCategory?: string;
  onSelect?: (category: string) => void;
}

export default function CategoryCarousel({
  title,
  categories,
  selectedCategory,
  onSelect,
}: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-8 bg-gray-50/50 rounded-3xl my-6">
      <div className="flex items-center justify-between mb-6 px-4 lg:px-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
          {title}
        </h2>
        <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="bg-white rounded-full p-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-gray-700"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-white rounded-full p-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-gray-700"
            >
              <ChevronRight size={20} />
            </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-4 lg:px-8 pb-4 -mx-4 lg:mx-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* "All" Category */}
          <button
            onClick={() => onSelect?.("ALL")}
            className={`flex-shrink-0 flex flex-col items-center gap-3 transition-all duration-300 group ${selectedCategory === "ALL" ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
          >
            <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 transition-all duration-300 ${selectedCategory === "ALL" ? 'border-primary shadow-lg shadow-primary/20' : 'border-white shadow-sm'}`}>
              <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white font-black text-xs">ALL</div>
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${selectedCategory === "ALL" ? 'text-primary' : 'text-gray-500'}`}>
              All Items
            </span>
          </button>

          {categories.map((category) => {
            const isSelected = selectedCategory === category.name;
            const [isLoaded, setIsLoaded] = useState(false);
            const [error, setError] = useState(false);

            return (
              <button
                key={category.id}
                onClick={() => onSelect?.(category.name)}
                className={`flex-shrink-0 flex flex-col items-center gap-3 transition-all duration-300 group ${isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
              >
                <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 transition-all duration-300 relative bg-gray-50 ${isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-white shadow-sm'}`}>
                  {!isLoaded && !error && (
                    <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
                  )}
                  <img 
                    src={error ? DEFAULT_FOOD_IMAGE : category.image} 
                    alt={category.name}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${isSelected ? 'text-primary' : 'text-gray-500'}`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
