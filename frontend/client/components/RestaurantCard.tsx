import { useState } from "react";
import { Star, Zap } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { DEFAULT_FOOD_IMAGE } from "@/lib/constants";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisines: string[];
  deliveryTime: string;
  costForTwo: string;
  discount?: string;
  isPromoted?: boolean;
  isVeg?: boolean;
}

export default function RestaurantCard({
  name,
  image,
  rating,
  cuisines,
  deliveryTime,
  costForTwo,
  discount,
  isPromoted,
  isVeg,
}: RestaurantCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden h-44 bg-gray-100">
        {!isLoaded && !error && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        
        <img
          src={error ? DEFAULT_FOOD_IMAGE : image}
          alt={name}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setError(true);
            (e.target as HTMLImageElement).src = DEFAULT_FOOD_IMAGE;
          }}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/ transparency-0 transition-colors" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isPromoted && (
            <span className="bg-primary/90 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
              Promoted
            </span>
          )}
          {discount && (
            <span className="bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
              {discount}
            </span>
          )}
        </div>

        {/* Fast Delivery Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
            <Zap size={12} className="text-primary fill-primary" />
            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tight">{deliveryTime} MINS</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {isVeg !== undefined && (
              <div className={`flex-shrink-0 w-4 h-4 border-2 ${isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-0.5 rounded-sm`}>
                <div className={`w-full h-full rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
              </div>
            )}
            <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-green-700 text-white rounded px-1.5 py-0.5 text-xs font-bold flex-shrink-0">
            {rating.toFixed(1)}
            <Star size={10} className="fill-white" />
          </div>
        </div>

        {/* Cuisines */}
        <p className="text-xs text-gray-500 mt-1 line-clamp-1 font-medium">
          {cuisines.join(", ")}
        </p>

        {/* Cost and Rating Count */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-bold text-gray-700">{costForTwo}</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {Math.floor(Math.random() * 4000 + 500)} REVIEWS
          </span>
        </div>
      </div>
    </div>
  );
}
