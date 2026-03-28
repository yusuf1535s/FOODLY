import { useState } from "react";
import axios from "axios";
import { Clock, MapPin, ChefHat, Navigation, Zap, ArrowLeft, Utensils, Timer, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import Header from "@/components/Header";

// --- CONFIG ---
const API_URL = "http://localhost:5000"; 
const containerStyle = { width: "100%", height: "450px", borderRadius: "24px" };
const defaultCenter = { lat: 12.9716, lng: 77.5946 };

const FOOD_DATABASE: any = {
  indian: [
    { name: "Chicken Donne Biryani", prep: 25, price: "₹280" },
    { name: "Butter Kulcha & Paneer", prep: 18, price: "₹220" },
    { name: "Mutton Sukka", prep: 30, price: "₹350" },
    { name: "Cold Coffee", prep: 10, price: "₹70" },
    { name: "Lemon Rice", prep: 20, price: "₹80" },
    { name: "Chapati & Paneer Masala", price: "₹250" },
     { name: "Ghee Masala Dosa", prep: 12, price: "₹90" },
    { name: "Thatte Idli (2 pcs)", prep: 8, price: "₹60" },
    { name: "Maddur Vada Special", prep: 10, price: "₹45" }
  ],
};

export default function OrderTracker() {
  const [source, setSource] = useState("Bangalore");
  const [destination, setDestination] = useState("Mysore");
  const [directions, setDirections] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [manualArrivalMins, setManualArrivalMins] = useState<number>(45); 
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [highwaySyncLoading, setHighwaySyncLoading] = useState(false);

  // --- 1. GOOGLE API SEARCH ---
  const searchNearby = (location: any) => {
    if (!window.google) return;
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
    service.nearbySearch(
      { location, radius: 8000, type: "restaurant" },
      (results: any, status: any) => {
        if (status === "OK") {
          setRestaurants((prev) => {
            const combined = [...prev];
            results.forEach((place: any) => {
              if (!combined.find((p) => p.place_id === place.place_id)) {
                let cat = place.name.toLowerCase().includes("idli") ? "south" : "indian";
                combined.push({ 
                  ...place, 
                  menu: FOOD_DATABASE[cat],
                  geometry: place.geometry 
                });
              }
            });
            return combined;
          });
        }
      }
    );
  };

  const handleRouteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setRestaurants([]);
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      { origin: source, destination: destination, travelMode: window.google.maps.TravelMode.DRIVING },
      (result: any, status: any) => {
        if (status === "OK") {
          setDirections(result);
          const routePath = result.routes[0].overview_path;
          const interval = Math.floor(routePath.length / 10);
          for (let i = 0; i < routePath.length; i += interval) {
            searchNearby(routePath[i]);
          }
        }
        setIsSearching(false);
      }
    );
  };

  // --- 2. HIGHWAY AXIOS SYNC (FIXED TYPESCRIPT ERROR) ---
  const fetchHighwayRestaurants = async () => {
    setHighwaySyncLoading(true);
    try {
      const params = { s_lat: 12.9716, s_lng: 77.5946, d_lat: 12.2958, d_lng: 76.6394 };
      // 🚀 Added 'as any' to the response to bypass 'unknown' error
      const res = await axios.get(`${API_URL}/api/restaurants/route`, { params }) as any;
      const fetched = res.data?.restaurants || res.data;

      if (Array.isArray(fetched)) {
        setRestaurants(fetched.map((item: any) => ({
          ...item,
          menu: FOOD_DATABASE.indian,
          geometry: { 
            location: { 
              lat: typeof item.lat === 'number' ? item.lat : 0, 
              lng: typeof item.lng === 'number' ? item.lng : 0 
            } 
          }
        })));
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setHighwaySyncLoading(false);
    }
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const arrivalDate = new Date(now.getTime() + manualArrivalMins * 60000);
    const startTimeDate = new Date(arrivalDate.getTime() - (selectedItem?.prep || 0) * 60000);

    setOrderDetails({
      id: Math.floor(Math.random() * 100) + 1,
      food: selectedItem.name,
      arrival_time: arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      start_time: startTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    });
  };

  const addDelay = (mins: number) => {
    const d = new Date(`2024-01-01T${orderDetails.arrival_time}`);
    d.setMinutes(d.getMinutes() + mins);
    setOrderDetails({
      ...orderDetails,
      arrival_time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto py-12 px-4">
        
        {!orderDetails ? (
          <div className="block animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 mb-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight italic"><Navigation className="text-red-600" /> AI Dashboard</h2>
              <form onSubmit={handleRouteSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none font-bold" value={source} onChange={e => setSource(e.target.value)} />
                <input className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none font-bold" value={destination} onChange={e => setDestination(e.target.value)} />
                <button className="bg-red-600 text-white font-black rounded-2xl shadow-lg uppercase italic">Find Food</button>
              </form>
            </div>

            <div className="mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white relative">
              <LoadScript googleMapsApiKey="AIzaSyBbsBdemk-EivA4Di-07qW32xV-OHeaDME" libraries={["places"]}>
                <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10}>
                  {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: "#ef4444", strokeWeight: 5 } }} />}
                  {restaurants.map((res, i) => {
                    const position = {
                        lat: typeof res.geometry.location.lat === 'function' ? res.geometry.location.lat() : res.geometry.location.lat,
                        lng: typeof res.geometry.location.lng === 'function' ? res.geometry.location.lng() : res.geometry.location.lng
                    };
                    return (
                        <Marker 
                            key={res.place_id || i} 
                            position={position} 
                            onClick={() => { setSelectedRestaurant(res); setSelectedItem(null); }}
                            icon={{ url: "https://cdn-icons-png.flaticon.com/512/1147/1147805.png", scaledSize: new window.google.maps.Size(30,30) }}
                        />
                    );
                  })}
                </GoogleMap>
              </LoadScript>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                <h3 className="font-black text-xl mb-6 uppercase italic flex items-center gap-2"><Utensils className="text-red-600" /> Menu: {selectedRestaurant?.name || 'Pick Stop'}</h3>
                <div className="space-y-3">
                  {(selectedRestaurant?.menu || FOOD_DATABASE.indian).map((item: any, i: number) => (
                    <div key={i} onClick={() => setSelectedItem(item)} className={`p-5 rounded-2xl border-2 flex justify-between cursor-pointer ${selectedItem?.name === item.name ? 'border-red-600 bg-red-50' : 'border-gray-50 bg-gray-50'}`}>
                      <span className="font-black text-gray-800">{item.name}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{item.prep}M PREP</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 text-center">
                <h3 className="font-black text-xl mb-6 uppercase italic">AI Sync Engine</h3>
                <div className="space-y-6">
                  <div className="p-5 bg-gray-900 text-white rounded-3xl font-bold flex items-center gap-3 justify-center"><ChefHat className="text-red-500" /><span>{selectedItem ? `Pre-order: ${selectedItem.name}` : "Select a dish..."}</span></div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                      <label className="text-[10px] font-black text-gray-400 uppercase block mb-4 italic">Arrival: {manualArrivalMins}m</label>
                      <input type="range" min="10" max="180" step="5" value={manualArrivalMins} onChange={e => setManualArrivalMins(parseInt(e.target.value))} className="w-full accent-red-600" />
                  </div>
                  <button disabled={!selectedItem} onClick={handleOrder} className="w-full bg-red-600 text-white py-6 rounded-3xl font-black shadow-xl uppercase italic">ACTIVATE SYNC</button>
                  <button onClick={fetchHighwayRestaurants} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">{highwaySyncLoading ? "Syncing..." : "AI Highway DB Sync"}</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STATUS DASHBOARD */
          <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-red-600 px-8 py-10 text-white relative">
                <button onClick={() => setOrderDetails(null)} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"><ArrowLeft size={18}/></button>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight uppercase italic">KITCHEN SYNC ACTIVE</h2>
                        <p className="font-bold opacity-80 mt-1 uppercase">Order ID: #{orderDetails.id}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-2xl"><Zap fill="currentColor" /></div>
                </div>
                <div className="mt-10 relative px-4 flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <div className="flex flex-col items-center gap-2"><div className="bg-white text-red-600 p-2 rounded-full z-10 shadow-lg"><Clock size={16}/></div><span>Scheduled</span></div>
                    <div className="flex flex-col items-center gap-2 opacity-40"><div className="bg-red-600 border-2 border-white/50 p-2 rounded-full z-10"><ChefHat size={16}/></div><span>Preparing</span></div>
                    <div className="flex flex-col items-center gap-2 opacity-40"><div className="bg-red-600 border-2 border-white/50 p-2 rounded-full z-10"><CheckCircle2 size={16}/></div><span>Ready</span></div>
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-white/20" />
                </div>
              </div>

              <div className="bg-red-50 p-4 border-b border-red-100 text-center font-black text-red-600 flex justify-center items-center gap-2 italic">
                <AlertCircle size={18}/> {orderDetails.food} | Start: {orderDetails.start_time} | Ready by: {orderDetails.arrival_time}
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                            <div className="bg-white p-3 rounded-2xl text-red-600 shadow-sm"><Info size={24}/></div>
                            <div><p className="text-[10px] font-bold text-gray-400 uppercase">Item Synced</p><p className="text-xl font-black text-gray-900">{orderDetails.food}</p></div>
                        </div>
                        <div className="flex items-center gap-4 px-6"><Clock className="text-orange-500" size={20}/><div><p className="text-[10px] font-bold text-gray-400 uppercase">Cook Starts At</p><p className="text-lg font-black">{orderDetails.start_time}</p></div></div>
                        <div className="flex items-center gap-4 px-6"><MapPin className="text-green-500" size={20}/><div><p className="text-[10px] font-bold text-gray-400 uppercase">Perfect Pickup At</p><p className="text-lg font-black">{orderDetails.arrival_time}</p></div></div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gray-900 text-white p-8 rounded-[2rem] text-center">
                            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">AI Confidence</p>
                            <h2 className="text-6xl font-black text-red-500">95%</h2>
                            <p className="text-xs font-bold opacity-60 mt-2 italic text-center">Precision within 2mins</p>
                        </div>
                        <div className="bg-white border-2 border-red-50 p-4 rounded-[2rem]">
                            <p className="text-[10px] font-black text-red-600 text-center uppercase mb-3 italic">Running Late? Adjust Sync</p>
                            <div className="flex gap-2">
                                {[5, 10, 15].map(m => (
                                    <button key={m} onClick={() => addDelay(m)} className="flex-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 font-black py-3 rounded-2xl transition-all">+{m}m</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}