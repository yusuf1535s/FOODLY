import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.get("/api/restaurants/route", (req, res) => {
    const { s_lat, s_lng, d_lat, d_lng } = req.query;
    // Basic highway restaurant mock return for Bengaluru -> Mysuru.
    // In real world integration, perform spatial query or route-based search.
    const data = [
      {
        id: "hw1",
        name: "Highway Spice Junction",
        image: "https://images.unsplash.com/photo-1604908177544-24d225215f64?q=80&w=400&h=300&auto=format&fit=crop",
        rating: 4.5,
        cuisines: ["South Indian", "North Indian"],
        deliveryTime: "32",
        costForTwo: "₹220 for one",
        isPromoted: true,
        isVeg: false,
        geometry: { location: { lat: 12.5, lng: 77.0 } }
      },
      {
        id: "hw2",
        name: "Mysuru Road Dine",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&h=300&auto=format&fit=crop",
        rating: 4.2,
        cuisines: ["Biryani", "Fast Food"],
        deliveryTime: "40",
        costForTwo: "₹300 for one",
        isPromoted: false,
        isVeg: false,
        geometry: { location: { lat: 12.35, lng: 76.75 } }
      },
      {
        id: "hw3",
        name: "Garden City Quick Bites",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&h=300&auto=format&fit=crop",
        rating: 4.0,
        cuisines: ["Cafe", "Desserts"],
        deliveryTime: "28",
        costForTwo: "₹180 for one",
        isPromoted: false,
        isVeg: true,
        geometry: { location: { lat: 12.42, lng: 76.9 } }
      }
    ];

    res.json({ source: { lat: s_lat, lng: s_lng }, destination: { lat: d_lat, lng: d_lng }, restaurants: data });
  });

  return app;
}
