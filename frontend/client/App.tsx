import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OrderTracker from "./pages/OrderTracker";
import RestaurantLogin from "./pages/RestaurantLogin";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverview from "./pages/restaurant/DashboardOverview";
import OrdersManagement from "./pages/restaurant/OrdersManagement";
import MenuManagement from "./pages/restaurant/MenuManagement";
import EarningsPayouts from "./pages/restaurant/EarningsPayouts";
import ReviewsRatings from "./pages/restaurant/ReviewsRatings";
import RestaurantSettings from "./pages/restaurant/RestaurantSettings";
import { Navigate } from "react-router-dom";
import HighwayRestaurants from "./pages/HighwayRestaurants";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pre-book" element={<OrderTracker />} />
          <Route path="/restaurant-login" element={<RestaurantLogin />} />
          
          {/* Restaurant Dashboard Routes */}
          <Route path="/restaurant" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="earnings" element={<EarningsPayouts />} />
            <Route path="reviews" element={<ReviewsRatings />} />
            <Route path="settings" element={<RestaurantSettings />} />
          </Route>

          <Route path="/restaurant-dashboard" element={<Navigate to="/restaurant/dashboard" replace />} />
          <Route path="/highway" element={<HighwayRestaurants />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
