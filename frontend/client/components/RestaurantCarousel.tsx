import { Clock, Zap, Star } from "lucide-react";

interface RestaurantCarouselProps {
  restaurants: any[];
  selectedId?: string;
  onSelect: (restaurant: any) => void;
}

export default function RestaurantCarousel({ restaurants, selectedId, onSelect }: RestaurantCarouselProps) {
  return (
    <div className="mb-10">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Restaurants on your route</h3>
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {restaurants.map((res) => {
          const isSelected = res.id === selectedId;
          return (
            <div
              key={res.id}
              onClick={() => onSelect(res)}
              className={`flex-shrink-0 w-64 p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                isSelected 
                  ? 'bg-red-50 border-primary shadow-md transform scale-[1.02]' 
                  : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                   <Zap size={18} fill={isSelected ? "white" : "none"} />
                </div>
                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                  <Star size={12} className="text-green-600 fill-green-600" />
                  <span className="text-xs font-bold text-green-700">{res.rating}</span>
                </div>
              </div>

              <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{res.name}</h4>
              <p className="text-xs text-gray-500 mb-4">{res.cuisines.join(", ")}</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100/50">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Clock size={14} />
                  <span className="text-xs font-medium">{res.deliveryTime}m travel</span>
                </div>
                <button 
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                    isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
