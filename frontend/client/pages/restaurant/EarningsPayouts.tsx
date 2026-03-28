import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import { 
  IndianRupee, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  CreditCard, 
  Download,
  Filter,
  PieChart as PieChartIcon
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const salesDistribution = [
  { name: "Food Sales", value: 8500, color: "#E8192C" },
  { name: "Delivery Fees", value: 1200, color: "#1A1A1A" },
  { name: "Taxes", value: 800, color: "#999999" },
];

const payoutHistory = [
  { date: "24 Mar, 2026", amount: "₹12,450.00", status: "Paid", method: "XXXX 4210" },
  { date: "17 Mar, 2026", amount: "₹10,200.00", status: "Paid", method: "XXXX 4210" },
  { date: "10 Mar, 2026", amount: "₹14,100.00", status: "Paid", method: "XXXX 4210" },
  { date: "03 Mar, 2026", amount: "₹9,800.00", status: "Paid", method: "XXXX 4210" },
];

export default function EarningsPayouts() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 leading-none">Earnings & Payouts</h3>
          <p className="text-sm font-semibold text-gray-400 mt-2 uppercase tracking-wider">Track your revenue and scheduled payments</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-12 rounded-xl font-bold uppercase tracking-widest text-xs border-gray-100 flex items-center gap-2">
             <Download size={16} />
             Statement
           </Button>
           <Button className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs px-8 shadow-xl shadow-primary/20">
             Help Center
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Earnings" 
          value="₹46,550" 
          trend="15%" 
          trendUp={true} 
          icon={IndianRupee} 
        />
        <StatsCard 
          title="This Week" 
          value="₹12,450" 
          trend="8%" 
          trendUp={true} 
          icon={TrendingUp} 
          color="bg-green-50 text-green-600"
        />
        <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Next Payout</p>
              <h4 className="text-3xl font-black mt-1 tracking-tight">31 Mar, 2026</h4>
           </div>
           <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <CreditCard size={16} className="text-primary" />
                </div>
                <span className="text-xs font-bold text-gray-400">Est. ₹12,450</span>
              </div>
              <ArrowUpRight className="text-gray-600" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Distribution */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-8 lowercase first-letter:uppercase">Earnings Breakdown</h3>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="h-[250px] w-full max-w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesDistribution}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {salesDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                        borderRadius: "20px", 
                        border: "none", 
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        textTransform: "uppercase",
                        fontSize: "10px",
                        fontWeight: 800
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-6 w-full">
               {salesDistribution.map((item) => (
                 <div key={item.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                       <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-xs font-black uppercase text-gray-400 tracking-widest group-hover:text-gray-900 transition-colors uppercase">{item.name}</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 italic">₹{item.value}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900 lowercase first-letter:uppercase">Payout History</h3>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400">
               <Filter size={18} />
            </Button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="border-b border-gray-100/50">
                  <TableHead className="text-[10px] font-black uppercase text-gray-400 tracking-widest h-14 pl-8">Date</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Amount</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-gray-400 tracking-widest text-right pr-8">Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((payout) => (
                  <TableRow key={payout.date} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-bold text-gray-900 py-6 pl-8">{payout.date}</TableCell>
                    <TableCell className="font-black text-primary">{payout.amount}</TableCell>
                    <TableCell>
                      <Badge className="rounded-full bg-green-50 text-green-600 border-none font-black uppercase text-[9px] tracking-widest px-3 py-1">
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[10px] font-black text-gray-400 text-right pr-8 uppercase tracking-widest italic">{payout.method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-8 mt-auto flex justify-center border-t border-gray-50">
            <Button variant="ghost" className="text-xs font-black uppercase text-primary tracking-widest hover:bg-red-50 px-8">View more history</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
