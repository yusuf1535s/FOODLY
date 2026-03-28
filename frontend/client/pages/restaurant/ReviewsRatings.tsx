import React from "react";
import { 
  Star, 
  Search, 
  Filter, 
  MessageSquare, 
  CornerDownRight, 
  User, 
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const reviews = [
  { id: 1, name: "Arjun S.", rating: 5, date: "2 Mar, 2026", dish: "Masala Dosa", comment: "The dosa was perfectly crispy and the chutney is just like homemade! Highly recommend.", reply: "Thank you Arjun! We are glad you enjoyed it." },
  { id: 2, name: "Priya K.", rating: 4, date: "1 Mar, 2026", dish: "Paneer Butter Masala", comment: "Great taste but could be a bit less spicy. Portions are generous.", reply: null },
  { id: 3, name: "Rahul M.", rating: 2, date: "28 Feb, 2026", dish: "Chicken Biryani", comment: "Order was delayed by 20 mins. Food arrived cold.", reply: "We are truly sorry for the delay, Rahul. We've adjusted our prep-time sync to avoid this in the future." },
  { id: 4, name: "Sneha G.", rating: 5, date: "25 Feb, 2026", dish: "Burger Combo", comment: "Best burger in town! The FreshServe AI timing was spot on.", reply: null },
];

export default function ReviewsRatings() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 leading-none">Reviews & Ratings</h3>
          <p className="text-sm font-semibold text-gray-400 mt-2 uppercase tracking-wider">Know what your customers are saying about you</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl font-bold uppercase tracking-widest text-xs h-12 border-gray-200">
             Export Reviews
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center h-full">
           <div className="h-24 w-24 rounded-3xl bg-yellow-50 flex items-center justify-center text-yellow-500 mb-4 animate-in zoom-in-0 duration-500">
             <Star size={44} fill="currentColor" />
           </div>
           <h4 className="text-4xl font-black text-gray-900 leading-none">4.8</h4>
           <p className="text-xs font-black text-gray-400 mt-2 uppercase tracking-widest leading-none italic">Lifetime Average</p>
           
           <div className="w-full mt-10 space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4 group">
                  <span className="text-[10px] font-black text-gray-400 w-4 group-hover:text-primary transition-colors">{star}</span>
                  <Progress value={star === 5 ? 85 : star === 4 ? 12 : 3} className="h-2 rounded-full bg-gray-50 flex-1 shadow-inner h-2 transition-all group-hover:bg-gray-100" />
                  <span className="text-[10px] font-black text-gray-400 w-8 group-hover:text-primary transition-colors">{star === 5 ? "85%" : star === 4 ? "12%" : "3%"}</span>
                </div>
              ))}
           </div>

           <div className="mt-10 p-6 bg-primary/5 rounded-3xl w-full border border-dashed border-primary/20">
              <p className="text-[10px] font-black uppercase text-primary tracking-widest">Growth ⚡</p>
              <p className="text-sm font-bold text-gray-700 mt-1 uppercase">+0.2 from last month</p>
           </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
           {/* Filters */}
           <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                 {["All", "Positive", "Negative", "Unanswered"].map(f => (
                   <button key={f} className={cn(
                     "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                     f === "All" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                   )}>
                     {f}
                   </button>
                 ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search reviews..." className="pl-11 h-12 rounded-xl bg-gray-50/50 border-gray-100" />
              </div>
           </div>

           {/* Review Cards */}
           <div className="space-y-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:shadow-lg transition-all duration-300">
                   <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 flex-shrink-0">
                           <User size={20} />
                         </div>
                         <div>
                            <h5 className="text-sm font-black text-gray-900 lowercase first-letter:uppercase">{rev.name}</h5>
                            <div className="flex items-center gap-1 mt-1">
                               {[1, 2, 3, 4, 5].map(s => (
                                 <Star key={s} size={12} className={s <= rev.rating ? "text-yellow-400 fill-yellow-400 scale-90" : "text-gray-200 fill-gray-200 scale-90"} />
                               ))}
                               <span className="h-1 w-1 rounded-full bg-gray-200 mx-2" />
                               <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{rev.date}</span>
                            </div>
                         </div>
                      </div>
                      <Badge className="rounded-xl px-3 py-1 bg-gray-50 text-gray-400 border-none font-bold text-[9px] uppercase tracking-widest italic group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        {rev.dish}
                      </Badge>
                   </div>

                   <p className="text-sm font-medium text-gray-600 italic leading-relaxed pl-16">"{rev.comment}"</p>

                   {rev.reply && (
                     <div className="mt-6 ml-16 p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-start gap-4 animate-in slide-in-from-left-4 duration-500">
                        <CornerDownRight size={18} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Your Response</p>
                           <p className="text-xs font-bold text-gray-500 tracking-tight italic leading-relaxed">"{rev.reply}"</p>
                        </div>
                     </div>
                   )}

                   {!rev.reply && (
                     <div className="mt-8 flex justify-end">
                        <Button variant="ghost" className="h-10 rounded-xl px-6 font-black uppercase text-[10px] tracking-widest bg-gray-50 text-gray-400 hover:text-primary hover:bg-red-50 group-hover:border-primary/20 transition-all border border-transparent">
                          Reply to Review
                        </Button>
                     </div>
                   )}
                </div>
              ))}
           </div>
           
           <div className="pt-8 flex justify-center">
             <Button variant="ghost" className="rounded-2xl h-12 px-10 font-black uppercase text-[10px] tracking-widest text-primary hover:bg-red-50 uppercase border-2 border-transparent">
               Load more reviews
             </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
