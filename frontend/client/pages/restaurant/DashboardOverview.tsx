import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import { 
  ShoppingBag, 
  IndianRupee, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  Star
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const revenueData = [
  { name: "Mon", total: 4500 },
  { name: "Tue", total: 5200 },
  { name: "Wed", total: 4800 },
  { name: "Thu", total: 6100 },
  { name: "Fri", total: 7500 },
  { name: "Sat", total: 9200 },
  { name: "Sun", total: 8800 },
];

const activeOrders = [
  { id: "#2849", customer: "Arjun S.", items: "1x Masala Dosa", status: "Preparing", time: "5m ago" },
  { id: "#2850", customer: "Priya K.", items: "2x Paneer Tikka", status: "New", time: "2m ago" },
  { id: "#2848", customer: "Rahul M.", items: "1x Chicken Biryani", status: "Ready", time: "12m ago" },
];

const topDishes = [
  { name: "Masala Dosa", sales: 124, growth: "+12%", color: "bg-orange-100/50 text-orange-600" },
  { name: "Paneer Butter Masala", sales: 98, growth: "+8%", color: "bg-red-100/50 text-red-600" },
  { name: "Chicken Biryani", sales: 86, growth: "+15%", color: "bg-yellow-100/50 text-yellow-600" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Orders" 
          value="156" 
          trend="12%" 
          trendUp={true} 
          icon={ShoppingBag} 
        />
        <StatsCard 
          title="Revenue" 
          value="₹12,450" 
          trend="8.5%" 
          trendUp={true} 
          icon={IndianRupee} 
          color="bg-green-100/50 text-green-600"
        />
        <StatsCard 
          title="Avg. Prep Time" 
          value="12.5m" 
          trend="2.1m" 
          trendUp={false} 
          icon={Clock} 
          color="bg-blue-100/50 text-blue-600"
        />
        <StatsCard 
          title="Rating" 
          value="4.8" 
          trend="0.2" 
          trendUp={true} 
          icon={Star} 
          color="bg-yellow-100/50 text-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-900">Revenue Overview</h3>
              <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Weekly earnings analytics</p>
            </div>
            <div className="flex bg-gray-50 p-1 rounded-2xl">
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <button 
                  key={tab}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    tab === "Weekly" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E8192C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#E8192C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#999", fontSize: 12, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#999", fontSize: 12, fontWeight: 700 }} 
                  tickFormatter={(val) => `₹${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: "20px", 
                    border: "none", 
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    fontSize: "12px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#E8192C" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Orders Feed */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-900">Live Orders</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">3 Active Now</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-black uppercase text-xs hover:bg-red-50">
              View All
            </Button>
          </div>

          <div className="flex-1 space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="group p-4 rounded-3xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-black text-gray-900">{order.id}</span>
                  <Badge variant="outline" className={cn(
                    "text-[10px] uppercase font-black px-2 py-0",
                    order.status === "New" ? "bg-blue-50 text-blue-600 border-blue-100" :
                    order.status === "Preparing" ? "bg-orange-50 text-orange-600 border-orange-100" :
                    "bg-green-50 text-green-600 border-green-100"
                  )}>
                    {order.status}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight">{order.customer}</h4>
                <p className="text-xs font-medium text-gray-500 mt-1 line-clamp-1">{order.items}</p>
                <div className="mt-3 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                   <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                     <Clock size={12} /> {order.time}
                   </div>
                   <Button size="sm" className="h-8 rounded-xl px-4 text-xs font-black uppercase tracking-widest bg-white border border-gray-200 text-gray-900 hover:bg-primary hover:text-white hover:border-primary transition-all">
                     View
                   </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-3xl bg-primary/5 text-center">
            <p className="text-xs font-black text-primary uppercase tracking-widest leading-none">New order alert</p>
            <p className="text-[10px] font-bold text-primary/60 mt-1 uppercase">Ready to receive more</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Items */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-8 lowercase first-letter:uppercase">Top Selling dishes</h3>
          <div className="space-y-6">
            {topDishes.map((dish) => (
              <div key={dish.name} className="flex items-center gap-4">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl", dish.color)}>
                  {dish.name[0]}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-gray-900">{dish.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-primary">{dish.sales} orders</span>
                    <span className="h-1 w-1 rounded-full bg-gray-200" />
                    <span className="text-xs font-bold text-green-600">{dish.growth} growth</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-gray-900">
                  <ChevronRight size={20} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Summary Widget */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center text-center">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-yellow-50 flex items-center justify-center text-yellow-500 mb-4">
            <Star size={40} fill="currentColor" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 leading-none">4.8 / 5</h3>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Customer Satisfaction</p>
          <div className="mt-6 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={24} className={s <= 4 ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"} />
            ))}
          </div>
          <p className="mt-4 text-xs font-medium text-gray-500 mx-auto max-w-[200px]">
            Based on 532 reviews this month. You're doing amazing!
          </p>
          <Button variant="outline" className="mt-8 rounded-2xl border-2 font-black uppercase tracking-widest text-xs h-12">
            Read all reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
