import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Eye,
  Star,
  ShoppingBag,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

const orders = [
  { id: "#2850", customer: "Priya K.", items: "2x Paneer Tikka, 1x Naan", total: "₹450", status: "New", time: "2m ago", address: "HSR Layout, Sector 2", phone: "+91 98765 43210" },
  { id: "#2849", customer: "Arjun S.", items: "1x Masala Dosa", total: "₹120", status: "Preparing", time: "5m ago", address: "Koramangala 4th Block", phone: "+91 87654 32109" },
  { id: "#2848", customer: "Rahul M.", items: "1x Chicken Biryani", total: "₹320", status: "Ready", time: "12m ago", address: "Indiranagar 100ft Rd", phone: "+91 76543 21098" },
  { id: "#2847", customer: "Sneha G.", items: "3x Burger Combo", total: "₹890", status: "Delivered", time: "45m ago", address: "BTM Layout, 2nd Stage", phone: "+91 65432 10987" },
  { id: "#2846", customer: "Amit B.", items: "1x Malai Kofta", total: "₹280", status: "Cancelled", time: "1h ago", address: "Electronic City Phase 1", phone: "+91 54321 09876" },
];

export default function OrdersManagement() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const tabs = ["All", "New", "Preparing", "Ready", "Delivered", "Cancelled"];

  const filteredOrders = activeTab === "All" 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-gray-900 leading-none">Orders Management</h3>
          <p className="text-sm font-semibold text-gray-400 mt-2 uppercase tracking-wider">Manage and process incoming orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl font-bold uppercase tracking-wider text-xs border-gray-200">
            Export History
          </Button>
          <Button className="rounded-xl font-black uppercase tracking-wider text-xs bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            Pause New Orders
          </Button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 border border-transparent"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search Order ID or Name..." 
            className="pl-11 h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium text-sm"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-100/50">
              <TableHead className="w-[100px] text-[10px] font-black uppercase tracking-widest text-gray-400 h-14">Order ID</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400">Items (Total)</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400">Time</TableHead>
              <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="group border-b border-gray-50 hover:bg-red-50/20 transition-colors duration-200">
                <TableCell className="font-black text-gray-900 py-6">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-bold text-gray-900 leading-none">{order.customer}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{order.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-600 line-clamp-1">{order.items}</p>
                    <p className="text-xs font-black text-primary mt-1">{order.total}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-none border",
                    order.status === "New" ? "bg-blue-50 text-blue-600 border-blue-100" :
                    order.status === "Preparing" ? "bg-orange-50 text-orange-600 border-orange-100" :
                    order.status === "Ready" ? "bg-purple-50 text-purple-600 border-purple-100" :
                    order.status === "Delivered" ? "bg-green-50 text-green-600 border-green-100" :
                    "bg-red-50 text-red-600 border-red-100"
                  )}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-bold text-gray-400 italic">{order.time}</TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-primary">
                          <Eye size={18} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md rounded-[2.5rem] p-8">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-black text-gray-900 border-b pb-4 border-gray-100">Order Details {order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 mt-6">
                           <div className="flex justify-between items-start">
                             <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                               <h4 className="text-xl font-black text-gray-900">{order.customer}</h4>
                               <p className="text-sm font-bold text-primary mt-1">{order.phone}</p>
                             </div>
                             <Badge variant="outline" className="rounded-full bg-green-50 text-green-600 border-green-100 px-4 py-1 text-[10px] font-black">
                               Paid Online
                             </Badge>
                           </div>

                           <div className="space-y-3 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ordered Items</p>
                             <div className="flex justify-between items-center text-sm font-bold text-gray-900">
                               <span>{order.items}</span>
                               <span className="text-primary">{order.total}</span>
                             </div>
                             <div className="flex justify-between items-center text-xs text-gray-400">
                               <span>Delivery Fee</span>
                               <span>₹40</span>
                             </div>
                             <div className="pt-3 border-t border-gray-200 flex justify-between items-center font-black">
                               <span>Grand Total</span>
                               <span className="text-xl text-primary">₹520</span>
                             </div>
                           </div>

                           <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                             <MapPin size={16} className="text-primary" />
                             {order.address}
                           </div>

                           <div className="grid grid-cols-2 gap-3 mt-4">
                             <Button variant="outline" className="h-12 rounded-2xl border-2 font-black uppercase text-xs tracking-widest text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200">Reject</Button>
                             <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">Accept Order</Button>
                           </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400">
                      <MoreVertical size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredOrders.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
              <ShoppingBag size={40} />
            </div>
            <h4 className="text-xl font-black text-gray-900">No {activeTab} Orders</h4>
            <p className="text-sm font-semibold text-gray-400 mt-2">Check back later for new updates.</p>
          </div>
        )}
      </div>

      {/* Quick Action Footer */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-12 z-40 bg-gray-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-8 border border-white/10 backdrop-blur-md bg-opacity-90 max-w-[90vw] lg:max-w-none">
        <div className="flex items-center gap-4 border-r border-white/20 pr-8">
           <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center relative">
             <Bell size={20} className="animate-bounce" />
             <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-primary text-[10px] font-black flex items-center justify-center">3</span>
           </div>
           <div>
             <p className="text-xs font-black uppercase tracking-widest leading-none">New Orders Waiting</p>
             <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Immediate attention required</p>
           </div>
        </div>
        <Button className="rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-black uppercase text-xs tracking-widest px-8">
          View All New
        </Button>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
