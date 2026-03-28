import React, { useState } from 'react';
import axios from 'axios';

const HighwayRestaurants = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHighwayRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        s_lat: 12.9716,
        s_lng: 77.5946,
        d_lat: 12.2958,
        d_lng: 76.6394,
      };

      // 🚀 THE FIX: Cast the response to 'any' so TypeScript stops complaining
      const res = await axios.get('http://localhost:5000/api/restaurants/route', { params }) as any;
      
      const fetched = res.data?.restaurants ?? res.data;
      
      if (Array.isArray(fetched)) {
        setRestaurants(fetched);
      } else {
        setError('Unexpected response format from API');
      }
    } catch (err) {
      console.error('Highway fetch failed', err);
      setError('Could not fetch highway restaurants. Check server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Highway Pit-Stops</h1>
      <p className="mb-4 text-gray-600">Click the button to sync restaurants along Bangalore-Mysuru highway (AI-SYNC).</p>
      
      <button
        onClick={fetchHighwayRestaurants}
        disabled={loading}
        className={`mb-6 px-6 py-3 text-white rounded-xl font-bold transition flex items-center gap-2 ${
          loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {loading ? 'SYNCING...' : 'AI SYNC RESTAURANTS'}
      </button>

      {error && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {restaurants.length === 0 && !loading && !error && (
        <p className="text-gray-400 italic">No highway restaurants found yet. Try syncing!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((rest: any) => (
          <div key={rest.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white hover:shadow-md transition-shadow">
            <h2 className="font-black text-xl mb-2 text-gray-900">{rest.name}</h2>
            
            <div className="flex gap-2 mb-3">
               {rest.cuisines?.map((c: string, i: number) => (
                 <span key={i} className="text-[10px] bg-gray-100 px-2 py-1 rounded-md font-bold text-gray-500 uppercase tracking-tight">
                   {c}
                 </span>
               ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
              <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                ★ {rest.rating || '4.0'}
              </span>
              <p className="text-sm font-bold text-gray-700">{rest.costForTwo || '₹400 for two'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighwayRestaurants;