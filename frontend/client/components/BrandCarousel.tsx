import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_FOOD_IMAGE } from "@/lib/constants";

interface Brand {
  id: string;
  name: string;
  deliveryTime: string;
  image: string;
}

interface BrandCarouselProps {
  title: string;
  brands: Brand[];
}

export default function BrandCarousel({ title, brands }: BrandCarouselProps) {
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
    <div className="py-8">
      <div className="flex items-center justify-between mb-6 px-4 lg:px-0">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
          {title}
        </h2>
        <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="bg-white rounded-full p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all text-gray-700"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-white rounded-full p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all text-gray-700"
            >
              <ChevronRight size={16} />
            </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 lg:px-0 pb-4 -mx-4 lg:mx-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 rounded-2xl overflow-hidden h-36 w-44 cursor-pointer group relative shadow-sm border border-gray-100 bg-white"
            >
              {/* Image */}
              <img 
                src={brand.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                alt={brand.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_FOOD_IMAGE;
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-black text-sm line-clamp-2 leading-tight uppercase tracking-tight">
                  {brand.name}
                </h3>
                <p className="text-white/80 text-[10px] font-bold mt-1 uppercase tracking-widest">{brand.deliveryTime}</p>
              </div>
            </div>
          ))}
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
