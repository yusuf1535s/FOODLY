import React, { useState } from "react";
import { 
  Building2, 
  Clock, 
  MapPin, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  Save, 
  Camera, 
  ChevronRight,
  Globe,
  Smartphone,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function RestaurantSettings() {
  const [autoAccept, setAutoAccept] = useState(true);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 leading-none">Restaurant Settings</h3>
          <p className="text-sm font-semibold text-gray-400 mt-2 uppercase tracking-wider">Manage your business profile and preferences</p>
        </div>
        <Button className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest px-10 shadow-xl shadow-primary/20 flex items-center gap-2">
          <Save size={20} />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Navigation Tabs (Vertical) */}
        <div className="lg:col-span-1 space-y-2">
           <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-2">
              {[
                { name: "General Info", icon: Building2, active: true },
                { name: "Operating Hours", icon: Clock },
                { name: "Delivery Radius", icon: MapPin },
                { name: "Payout Settings", icon: CreditCard },
                { name: "Notifications", icon: Bell },
                { name: "Account Safety", icon: ShieldCheck },
              ].map((item) => (
                <button
                  key={item.name}
                  className={cn(
                    "w-full flex items-center justify-between rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest transition-all",
                    item.active 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={18} />
                    {item.name}
                  </div>
                  <ChevronRight size={14} className={item.active ? "text-white" : "text-gray-200"} />
                </button>
              ))}
           </div>

           <div className="p-8 mt-6 bg-gray-900 rounded-[2.5rem] text-white">
              <h5 className="font-black text-xs uppercase tracking-widest text-primary mb-4">Support ⚡</h5>
              <p className="text-xs font-bold text-gray-400 leading-relaxed mb-6">Need help updating your bank details? Contact partner support.</p>
              <Button variant="outline" className="w-full h-12 rounded-xl border-white/20 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-gray-900">
                Contact Foodly
              </Button>
           </div>
        </div>

        {/* Setting Form Area */}
        <div className="lg:col-span-2 space-y-10">
           {/* Section 1: Basic Info */}
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-8">
                 <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 size={20} />
                 </div>
                 <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">General Info</h4>
              </div>

              <div className="space-y-8">
                 <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="relative group cursor-pointer h-24 w-24 rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 transition-all flex-shrink-0 overflow-hidden">
                       <Camera size={24} className="group-hover:scale-110 transition-transform" />
                       <span className="text-[8px] font-black uppercase tracking-widest mt-2">Upload Logo</span>
                       <div className="absolute inset-0 bg-primary/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-black uppercase">Change</span>
                       </div>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                       <div className="space-y-2">
                          <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Restaurant Name</Label>
                          <Input defaultValue="Meghana Foods" className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold focus:bg-white transition-all" />
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                       <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Cuisine Types</Label>
                       <Input defaultValue="Biryani, North Indian, Andhra" className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Street Address</Label>
                       <Input defaultValue="Koramangala 4th Block, Bengaluru" className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold focus:bg-white transition-all" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Short Description</Label>
                    <Textarea defaultValue="Legendary Biryani and Andhra meals served with love since 2006." className="min-h-[120px] rounded-[2rem] bg-gray-50/50 border-gray-100 font-medium font-bold p-6 focus:bg-white transition-all" />
                 </div>
              </div>
           </div>

           {/* Section 2: Operating Hours */}
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-8">
                 <div className="h-10 w-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                    <Clock size={20} />
                 </div>
                 <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Operating Hours</h4>
              </div>

              <div className="space-y-4">
                 {DAYS.map((day) => (
                   <div key={day} className="flex items-center justify-between p-5 rounded-[1.5rem] bg-gray-50 border border-gray-50 group hover:border-gray-200 transition-all transition-colors duration-300">
                      <div className="flex items-center gap-4">
                        <Switch className="data-[state=checked]:bg-green-500 scale-90" defaultChecked />
                        <span className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-primary transition-colors">{day}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                           <Input defaultValue="09:00 AM" className="h-10 w-28 rounded-xl bg-white border-gray-200 text-xs font-black uppercase text-center focus:ring-primary" />
                           <span className="mx-3 text-xs font-black text-gray-300">-</span>
                           <Input defaultValue="11:30 PM" className="h-10 w-28 rounded-xl bg-white border-gray-200 text-xs font-black uppercase text-center focus:ring-primary" />
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Section 3: Delivery Preferences */}
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b border-gray-50 pb-8 mb-8">
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Smartphone size={20} />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">App Preferences</h4>
                       <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-1"><Info size={10} /> Syncing apps with Foodly Kitchen AI</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                    <div className="space-y-1">
                       <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest">Auto-Accept Orders ⚡</h5>
                       <p className="text-xs font-bold text-gray-400 tracking-tight leading-relaxed max-w-sm">Automatically accept incoming orders to reduce prep time and customer wait.</p>
                    </div>
                    <Switch 
                       checked={autoAccept}
                       onCheckedChange={setAutoAccept}
                       className="data-[state=checked]:bg-primary scale-110"
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                       <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Delivery Radius (KM)</Label>
                       <div className="relative">
                          <Input defaultValue="5.5" className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold pr-14 focus:bg-white transition-all" />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-gray-300 uppercase">KM</span>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-black uppercase text-gray-400 tracking-widest">Min. Order Value (₹)</Label>
                       <div className="relative">
                          <Input defaultValue="150" className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold pr-14 focus:bg-white transition-all" />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-gray-300 uppercase">₹</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
