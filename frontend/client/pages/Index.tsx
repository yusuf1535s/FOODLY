import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import BrandCarousel from "@/components/BrandCarousel";
import RestaurantCard from "@/components/RestaurantCard";

export default function Index() {
  const [activeTab, setActiveTab] = useState("delivery");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [foodType, setFoodType] = useState<"ALL" | "VEG" | "NON_VEG">("ALL");

  // Mock data for categories
  const categories = [
    { id: "1", name: "BIRYANI", image: "https://images.unsplash.com/photo-1631515243349-e197fb11fc88?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "2", name: "PIZZA", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "3", name: "BURGER", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "4", name: "CHICKEN", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "5", name: "CAKE", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "6", name: "HEALTHY", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "7", name: "ROLLS", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "8", name: "NORTH INDIAN", image: "https://images.unsplash.com/photo-1517244681291-4d9d5ddad268?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "9", name: "THALI", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=200&h=200&auto=format&fit=crop" },
    { id: "10", name: "SANDWICH", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=200&h=200&auto=format&fit=crop" },
  ];

  // Mock data for brands
  const brands = [
    { id: "1", name: "Meghana Biryani", deliveryTime: "48 min", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&h=300&auto=format&fit=crop" },
    { id: "2", name: "Nandhini Deluxe", deliveryTime: "39 min", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&h=150&auto=format&fit=crop" },
    { id: "3", name: "Domino's Pizza", deliveryTime: "23 min", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&h=150&auto=format&fit=crop" },
    { id: "4", name: "Empire Restaurant", deliveryTime: "47 min", image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=200&h=150&auto=format&fit=crop" },
    { id: "5", name: "KFC", deliveryTime: "48 min", image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=200&h=150&auto=format&fit=crop" },
    { id: "6", name: "McDonald's", deliveryTime: "41 min", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=200&h=150&auto=format&fit=crop" },
    { id: "7", name: "Burger King", deliveryTime: "50 min", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop" },
    { id: "8", name: "Anand Sweets", deliveryTime: "47 min", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&h=150&auto=format&fit=crop" },
  ];

  // Mock data for restaurants
  const restaurants = [
    {
      id: "1",
      name: "Meghana Biryani",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.4,
      cuisines: ["Biryani", "Andhra", "North Indian"],
      deliveryTime: "48",
      costForTwo: "₹500 for one",
      isPromoted: true,
      category: "BIRYANI",
      isVeg: false
    },
    {
      id: "2",
      name: "Domino's Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.1,
      cuisines: ["Pizza", "Fast Food", "Desserts"],
      deliveryTime: "23",
      costForTwo: "₹200 for one",
      discount: "₹80 OFF",
      category: "PIZZA",
      isVeg: false
    },
    {
      id: "3",
      name: "Empire Restaurant",
      image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.2,
      cuisines: ["North Indian", "Chinese", "Biryani"],
      deliveryTime: "47",
      costForTwo: "₹350 for one",
      discount: "30% OFF",
      isPromoted: true,
      category: "NORTH INDIAN",
      isVeg: false
    },
    {
      id: "4",
      name: "McDonald's",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.0,
      cuisines: ["Fast Food", "Burgers", "Beverages"],
      deliveryTime: "41",
      costForTwo: "₹200 for one",
      discount: "30% OFF",
      isPromoted: true,
      category: "BURGER",
      isVeg: false
    },
    {
      id: "5",
      name: "KFC",
      image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 3.6,
      cuisines: ["Burgers", "Fast Food", "Rolls"],
      deliveryTime: "48",
      costForTwo: "₹200 for one",
      discount: "30% OFF",
      category: "CHICKEN",
      isVeg: false
    },
    {
      id: "6",
      name: "Siddiq Kabab Center",
      image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.3,
      cuisines: ["North Indian", "BBQ", "Rolls"],
      deliveryTime: "48",
      costForTwo: "₹100 for one",
      discount: "30% OFF",
      isPromoted: true,
      category: "NORTH INDIAN",
      isVeg: false
    },
    {
      id: "7",
      name: "Burger King",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.0,
      cuisines: ["Burgers", "Fast Food", "Beverages"],
      deliveryTime: "50",
      costForTwo: "₹200 for one",
      discount: "30% OFF",
      category: "BURGER",
      isVeg: false
    },
    {
      id: "8",
      name: "Hari Super Sandwich",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.1,
      cuisines: ["Sandwich", "Street Food", "Fast Food"],
      deliveryTime: "44",
      costForTwo: "₹200 for one",
      discount: "30% OFF",
      isPromoted: true,
      category: "SANDWICH",
      isVeg: true
    },
  ];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.cuisines.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "ALL" || r.category === selectedCategory;
    const matchesFoodType = foodType === "ALL" || (foodType === "VEG" ? r.isVeg : !r.isVeg);
    const matchesRating = !selectedFilters.includes("Rating 4.0+") || r.rating >= 4.0;
    
    // Cuisine Filtering Logic
    const activeCuisines = selectedFilters.filter(f => ["Biryani", "Pizza", "Burgers"].includes(f));
    const matchesCuisineFilter = activeCuisines.length === 0 || activeCuisines.some(c => r.cuisines.includes(c));

    return matchesSearch && matchesCategory && matchesFoodType && matchesRating && matchesCuisineFilter;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={setSearchQuery} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 px-4 lg:px-0 py-3 border-b border-gray-100">
          <a href="#" className="text-primary font-medium hover:underline">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Bengaluru</span>
        </nav>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 px-4 lg:px-0">
          <div className="flex gap-8">
            {["Dining Out", "Delivery", "Nightlife"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
                className={`py-4 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.toLowerCase().replace(" ", "")
                    ? "text-primary border-primary"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-3 px-4 lg:px-0 py-4 border-b border-gray-100 overflow-x-auto">
          <button 
            onClick={() => {
              if (selectedFilters.includes("Rating 4.0+")) {
                setSelectedFilters(selectedFilters.filter(f => f !== "Rating 4.0+"));
              } else {
                setSelectedFilters([...selectedFilters, "Rating 4.0+"]);
              }
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 font-medium text-sm flex-shrink-0 ${
              selectedFilters.includes("Rating 4.0+") 
              ? "bg-primary/10 border-primary text-primary shadow-sm"
              : "border-gray-300 hover:border-gray-400 text-gray-700 bg-white"
            }`}
          >
            <Filter size={16} />
            Rating 4.0+
          </button>

          {/* Veg/Non-Veg Toggles */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button 
              onClick={() => setFoodType(foodType === "VEG" ? "ALL" : "VEG")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-medium text-sm ${
                foodType === "VEG" 
                ? "bg-green-50 border-green-600 text-green-700 shadow-sm" 
                : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className={`w-3 h-3 border-2 border-green-600 flex items-center justify-center p-0.5 rounded-sm`}>
                <div className="w-full h-full rounded-full bg-green-600" />
              </div>
              Veg 🌱
            </button>
            <button 
              onClick={() => setFoodType(foodType === "NON_VEG" ? "ALL" : "NON_VEG")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-medium text-sm ${
                foodType === "NON_VEG" 
                ? "bg-red-50 border-red-600 text-red-700 shadow-sm" 
                : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className={`w-3 h-3 border-2 border-red-600 flex items-center justify-center p-0.5 rounded-sm`}>
                <div className="w-full h-full rounded-full bg-red-600" />
              </div>
              Non-Veg 🍗
            </button>
          </div>

          <div className="w-px h-6 bg-gray-200 mx-1 flex-shrink-0" />

          {/* Quick Cuisine Filters */}
          {["Biryani", "Pizza", "Burgers"].map(cuisine => (
            <button
              key={cuisine}
              onClick={() => {
                if (selectedFilters.includes(cuisine)) {
                  setSelectedFilters(selectedFilters.filter(f => f !== cuisine));
                } else {
                  setSelectedFilters([...selectedFilters, cuisine]);
                }
              }}
              className={`px-4 py-2 rounded-full border transition-all duration-300 font-medium text-sm flex-shrink-0 ${
                selectedFilters.includes(cuisine)
                ? "bg-primary/10 border-primary text-primary shadow-sm"
                : "border-gray-300 hover:border-gray-400 text-gray-700 bg-white"
              }`}
            >
              {cuisine}
            </button>
          ))}

          <div className="w-px h-6 bg-gray-200 mx-1 flex-shrink-0" />

          {selectedFilters.filter(f => !["Rating 4.0+", "Biryani", "Pizza", "Burgers"].includes(f)).map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm flex-shrink-0"
            >
              {filter}
              <button
                onClick={() =>
                  setSelectedFilters(selectedFilters.filter((f) => f !== filter))
                }
                className="text-gray-600 hover:text-gray-900"
              >
                ×
              </button>
            </div>
          ))}

          <button className="flex items-center gap-1 px-3 py-2 text-gray-700 font-medium text-sm flex-shrink-0 hover:bg-gray-100 rounded-full">
            Cuisines
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Inspiration Carousel */}
        <div className="px-4 lg:px-0">
          <CategoryCarousel
            title="Inspiration for your first order"
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Top Brands Carousel */}
        <div className="px-4 lg:px-0">
          <BrandCarousel title="Top brands for you" brands={brands} />
        </div>

        {/* Restaurant Listings Section */}
        <section className="px-4 lg:px-0 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Food Delivery Restaurants in Bengaluru
          </h1>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-8">
            <button className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200">
              See more restaurants
            </button>
          </div>
        </section>

        {/* Explore Section */}
        <section className="bg-gray-50 py-8 mt-8 px-4 lg:px-0">
          <div className="max-w-4xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Popular dishes near you
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Chicken Biryani",
                "Pizza",
                "Burger",
                "South Indian Meal",
                "Coffee",
                "Biryani",
                "Dosa",
                "Idli",
                "Thali",
              ].map((dish) => (
                <button
                  key={dish}
                  className="text-left p-3 bg-white rounded-lg hover:shadow-md transition-shadow duration-200 border border-gray-200"
                >
                  <span className="text-gray-900 font-medium">{dish}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="text-white font-bold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">For Users</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">For Partners</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Partner With Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    APIs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm">© 2026 Foodly. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white">
                Facebook
              </a>
              <a href="#" className="hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}