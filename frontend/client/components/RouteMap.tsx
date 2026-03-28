import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";

interface RouteMapProps {
  source: string;
  destination: string;
  restaurants: any[];
  setRestaurants: (data: any[]) => void;
  setSelectedRestaurant: (res: any) => void; // Added to sync with your Order Form
}

const containerStyle = { width: "100%", height: "500px", borderRadius: "24px" };
const defaultCenter = { lat: 12.9716, lng: 77.5946 };

export default function RouteMap({ source, destination, setRestaurants, setSelectedRestaurant }: RouteMapProps) {
  const [directions, setDirections] = useState<any>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);

  // Function to determine which icon to show (Burger for fast food, etc.)
  const getCustomIcon = (types: string[]) => {
    if (types.includes("cafe")) return "https://maps.google.com/mapfiles/kml/shapes/coffee.png";
    if (types.includes("bar")) return "https://maps.google.com/mapfiles/kml/shapes/bars.png";
    // Default restaurant icon (small plate/fork)
    return "https://maps.google.com/mapfiles/kml/shapes/dining.png";
  };

  const searchAtPoint = useCallback((location: any) => {
    if (!window.google) return;
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));

    service.nearbySearch(
      {
        location,
        radius: 5000, 
        type: "restaurant",
      },
      (results: any, status: any) => {
        if (status === "OK") {
          setNearbyPlaces((prev) => {
            const combined = [...prev];
            results.forEach((place: any) => {
              if (!combined.find((p) => p.place_id === place.place_id)) {
                combined.push(place);
              }
            });
            setRestaurants(combined); 
            return combined;
          });
        }
      }
    );
  }, [setRestaurants]);

  useEffect(() => {
    if (!source || !destination || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === "OK") {
          setDirections(result);
          setNearbyPlaces([]); 
          
          const routePath = result.routes[0].overview_path;
          const samplingPoints = 10;
          const interval = Math.floor(routePath.length / samplingPoints);

          for (let i = 0; i < routePath.length; i += interval) {
            searchAtPoint(routePath[i]);
          }
        }
      }
    );
  }, [source, destination, searchAtPoint]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBbsBdemk-EivA4Di-07qW32xV-OHeaDME" libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10}>
        {directions && (
          <DirectionsRenderer 
            directions={directions} 
            options={{
              polylineOptions: {
                strokeColor: "#ef4444", // Matching your red theme
                strokeWeight: 5
              }
            }}
          />
        )}
        
        {nearbyPlaces.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            title={place.name}
            // Logic to handle marker click
            onClick={() => {
              setSelectedRestaurant({
                id: place.place_id,
                name: place.name,
                rating: place.rating,
                vicinity: place.vicinity,
                // Mock menu for the demo
                menu: ["Special Thali", "Quick Snack", "Refreshing Drink"],
                prepTimes: { "Special Thali": 20, "Quick Snack": 10, "Refreshing Drink": 5 }
              });
              // Auto-scroll to order form
              window.scrollTo({ top: 900, behavior: 'smooth' });
            }}
            icon={{
              url: getCustomIcon(place.types || []),
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}