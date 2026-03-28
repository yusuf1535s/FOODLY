import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({ title, value, trend, trendUp, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "h-12 w-12 rounded-2xl flex items-center justify-center",
          color ? color : "bg-primary/10 text-primary"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
            trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
