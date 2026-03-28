import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronRight, 
  Grid, 
  List, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Eye,
  ShoppingBag,
  Bell,
  Filter,
  ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_MENU = [
  { id: 1, name: "Masala Dosa", category: "South Indian", price: 120, description: "Crispy crepe served with potato masala and coconut chutney.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop", isVeg: true, isAvailable: true },
  { id: 2, name: "Paneer Butter Masala", category: "North Indian", price: 280, description: "Cottage cheese cubes in a rich tomato and butter gravy.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop", isVeg: true, isAvailable: true },
  { id: 3, name: "Chicken Biryani", category: "Biryani", price: 350, description: "Aromatic basmati rice cooked with tender chicken and spices.", image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800&auto=format&fit=crop", isVeg: false, isAvailable: true },
  { id: 4, name: "Gulab Jamun", category: "Desserts", price: 90, description: "Deep-fried milk dumplings soaked in sugar syrup.", image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&auto=format&fit=crop", isVeg: true, isAvailable: false },
  { id: 5, name: "Garlic Naan", category: "North Indian", price: 60, description: "Soft leavened bread flavoured with garlic.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop", isVeg: true, isAvailable: true },
];

const CATEGORIES = ["All", "South Indian", "North Indian", "Biryani", "Desserts", "Beverages"];

export default function MenuManagement() {
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredMenu = activeCategory === "All" 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  const toggleAvailability = (id: number) => {
    setMenu(prev => prev.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 leading-none">Menu Management</h3>
          <p className="text-sm font-semibold text-gray-400 mt-2 uppercase tracking-wider">Configure your restaurant's digital menu</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest px-8 shadow-xl shadow-primary/20 flex items-center gap-2">
              <Plus size={20} strokeWidth={3} />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-gray-900 border-b pb-6 border-gray-100">Add New dish</DialogTitle>
              <DialogDescription className="text-sm font-semibold text-gray-400 mt-2 uppercase tracking-widest pt-2">Enter the details for the new menu entry</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Dish Name</Label>
                  <Input placeholder="E.g. Masala Dosa" className="h-12 rounded-xl bg-gray-50/50 border-gray-100 font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Category</Label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-xl bg-gray-50/50 border-gray-100 font-bold">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl p-2 font-bold">
                        {CATEGORIES.slice(1).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Price (₹)</Label>
                    <Input type="number" placeholder="0.00" className="h-12 rounded-xl bg-gray-50/50 border-gray-100 font-bold" />
                  </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Item Type</Label>
                    <div className="flex gap-4">
                       <label className="flex items-center gap-2 cursor-pointer p-4 rounded-xl border-2 border-green-100 bg-green-50/20">
                         <input type="radio" name="type" className="text-green-600 focus:ring-green-500" />
                         <span className="text-xs font-black uppercase text-green-700 tracking-widest">Veg</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer p-4 rounded-xl border-2 border-red-100 bg-red-50/20">
                         <input type="radio" name="type" className="text-red-600 focus:ring-red-500" />
                         <span className="text-xs font-black uppercase text-red-700 tracking-widest">Non-Veg</span>
                       </label>
                    </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Description</Label>
                  <Textarea placeholder="Briefly describe the ingredients..." className="min-h-[120px] rounded-2xl bg-gray-50/50 border-gray-100 font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Dish Image</Label>
                  <div className="h-32 w-full rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center bg-gray-50/50 text-gray-400 cursor-pointer hover:bg-gray-100 transition-all group">
                    <ImageIcon className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload or Drag Image</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-8 pt-6 border-t border-gray-100">
               <Button variant="ghost" className="h-12 rounded-xl px-8 font-black uppercase text-xs tracking-widest hover:bg-gray-50">Cancel</Button>
               <Button className="h-12 rounded-xl px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">Save dish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter & Options */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === c 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search dishes..." 
              className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white font-medium text-xs"
            />
          </div>
          <div className="flex bg-gray-50 p-1 rounded-xl">
            <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-10 w-10 rounded-lg", viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-gray-400")}
                onClick={() => setViewMode("grid")}
            >
              <Grid size={18} />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-10 w-10 rounded-lg", viewMode === "list" ? "bg-white shadow-sm text-primary" : "text-gray-400")}
                onClick={() => setViewMode("list")}
            >
              <List size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className={cn(
        "grid gap-8",
        viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {filteredMenu.map((item) => (
          <div key={item.id} className="group relative flex flex-col bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
             {/* Image Area */}
             <div className="relative h-48 w-full overflow-hidden">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className={cn(
                        "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
                        !item.isAvailable && "grayscale grayscale-07"
                    )} 
                />
                {!item.isAvailable && (
                    <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center backdrop-blur-[2px]">
                        <Badge className="bg-white text-gray-900 font-black uppercase text-[10px] tracking-widest px-4 py-2 border-none">
                            Out of Stock
                        </Badge>
                    </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={cn(
                        "border-none font-black uppercase text-[9px] tracking-widest px-3 py-1",
                        item.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                        {item.isVeg ? "Veg" : "Non-Veg"}
                    </Badge>
                    <Badge className="bg-white/90 text-gray-900 border-none font-black uppercase text-[9px] tracking-widest px-3 py-1 backdrop-blur-md">
                        {item.category}
                    </Badge>
                </div>
             </div>

             {/* Content Area */}
             <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                    <h4 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                    <span className="text-xl font-black text-primary">₹{item.price}</span>
                </div>
                <p className="text-sm font-medium text-gray-400 mt-2 line-clamp-2 italic">{item.description}</p>
                
                <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Label htmlFor={`avail-${item.id}`} className="text-[10px] font-black uppercase text-gray-400 tracking-widest cursor-pointer">
                            Available ⚡
                        </Label>
                        <Switch 
                            id={`avail-${item.id}`}
                            checked={item.isAvailable}
                            onCheckedChange={() => toggleAvailability(item.id)}
                            className="scale-90 data-[state=checked]:bg-green-500"
                        />
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        <Button variant="ghost" size="icon" className="h-10 w-10 min-w-10 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-900">
                            <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 min-w-10 rounded-xl bg-red-50 text-red-400 hover:text-red-500 hover:bg-red-100">
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </div>
             </div>
          </div>
        ))}

        {/* Empty State Card */}
        <div className="bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-primary/20 transition-all transition-colors duration-500">
            <div className="h-16 w-16 rounded-3xl bg-white flex items-center justify-center text-gray-300 mb-6 shadow-sm border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                <Plus size={32} strokeWidth={3} />
            </div>
            <h4 className="text-lg font-black text-gray-900 opacity-50 uppercase tracking-widest tracking-tight">Add New entry</h4>
            <p className="text-xs font-bold text-gray-400 mt-2">Grow your menu list today</p>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
