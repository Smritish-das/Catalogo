"use client";

import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  Search,
  Sparkles,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";

const stats = [
  { label: "Total Products", value: "128", icon: ShoppingBag, trend: "+12%", color: "text-blue-500" },
  { label: "WhatsApp Inquiries", value: "45", icon: MessageSquare, trend: "+25%", color: "text-green-500" },
  { label: "Catalog Views", value: "2.4k", icon: Users, trend: "+18%", color: "text-purple-500" },
  { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, trend: "+5%", color: "text-orange-500" },
];

const recentInquiries = [
  { id: 1, customer: "John Doe", items: 3, total: 4200, status: "Sent", time: "2h ago" },
  { id: 2, customer: "Jane Smith", items: 1, total: 1200, status: "Pending", time: "5h ago" },
  { id: 3, customer: "Alex Wilson", items: 2, total: 3500, status: "Sent", time: "1d ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold font-outfit mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Here's what's happening with your showroom today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-white/5 border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-accent/50 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold font-outfit mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-outfit">Recent Inquiries</h2>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>
          
          <div className="bg-white dark:bg-white/5 border border-border rounded-[32px] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-accent/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Items</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-accent/20 transition-colors">
                    <td className="px-6 py-6 font-semibold">{inquiry.customer}</td>
                    <td className="px-6 py-6 text-muted-foreground">{inquiry.items} items</td>
                    <td className="px-6 py-6 font-bold">{formatPrice(inquiry.total)}</td>
                    <td className="px-6 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        inquiry.status === "Sent" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                      )}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button className="p-2 hover:bg-accent rounded-full">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Copywriter Quick Tool */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-outfit flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>AI Copywriter</span>
          </h2>
          
          <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-[32px] text-primary-foreground shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Generate Description</h3>
            <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
              Enter product details and let AI write a premium description for you.
            </p>
            <div className="space-y-4">
              <textarea 
                placeholder="e.g. Blue chair, wooden legs, velvet..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-sm placeholder:text-white/40 outline-none focus:bg-white/20 transition-all h-24"
              />
              <button className="w-full py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-all flex items-center justify-center space-x-2">
                <span>Generate Description</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
