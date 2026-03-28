import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  IndianRupee, 
  Star, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const sidebarLinks = [
  { name: "Dashboard", href: "/restaurant/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/restaurant/orders", icon: ShoppingBag, badge: 3 },
  { name: "Menu", href: "/restaurant/menu", icon: UtensilsCrossed },
  { name: "Earnings", href: "/restaurant/earnings", icon: IndianRupee },
  { name: "Reviews", href: "/restaurant/reviews", icon: Star },
  { name: "Settings", href: "/restaurant/settings", icon: Settings },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Derive dynamic title from path
  const currentPath = location.pathname.split("/").pop() || "dashboard";
  const pageTitle = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1A1A] text-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase italic">
                Foodly
              </span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                    {link.name}
                  </div>
                  {link.badge && (
                    <Badge className={cn(
                      "rounded-full px-2 py-0.5 text-[10px]",
                      isActive ? "bg-white text-primary" : "bg-primary text-white"
                    )}>
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section (Bottom) */}
          <div className="border-t border-white/5 p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">MF</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold text-white">Meghana Foods</p>
                <p className="truncate text-xs text-gray-500">Restaurant Partner</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="mt-2 w-full justify-start gap-3 text-gray-400 hover:bg-red-500/10 hover:text-red-500"
              asChild
            >
              <Link to="/">
                <LogOut className="h-5 w-5" />
                Sign Out
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn("flex flex-1 flex-col transition-all duration-300", isSidebarOpen ? "lg:pl-64" : "pl-0")}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between bg-white px-4 shadow-sm sm:px-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-gray-900 leading-none">{pageTitle}</h2>
              <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">Welcome back, Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* Online Status Toggle */}
            <div className="hidden items-center gap-3 rounded-full bg-gray-50 px-4 py-2 sm:flex">
              <span className={cn(
                "h-2 w-2 rounded-full animate-pulse",
                isOnline ? "bg-green-500" : "bg-red-500"
              )} />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest leading-none">
                {isOnline ? "Online" : "Offline"}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "h-7 rounded-full text-[10px] uppercase font-black px-3",
                  isOnline ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-green-50 hover:text-green-600"
                )}
                onClick={() => setIsOnline(!isOnline)}
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </Button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </Button>
              
              <div className="h-10 w-[1px] bg-gray-100 hidden sm:block" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 sm:h-auto sm:px-2 rounded-xl hover:bg-gray-50">
                    <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center text-white text-xs font-bold leading-none">
                      M
                    </div>
                    <span className="ml-2 hidden text-sm font-bold text-gray-900 sm:inline-block">Meghana Foods</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl">Bank Details</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl text-red-500">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
