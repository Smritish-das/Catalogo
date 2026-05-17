"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink,
  Eye,
  Filter
} from "lucide-react";
import Image from "next/image";
import { formatPrice, cn } from "@/lib/utils";
import Link from "next/link";

const MOCK_PRODUCTS = [
  { id: "1", name: "Premium Blue Vase", price: 1200, category: "Home Decor", stock: 12, status: "In Stock", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=200" },
  { id: "2", name: "Gold Minimalist Frame", price: 3000, category: "Furniture", stock: 5, status: "Low Stock", image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=200" },
  { id: "3", name: "Velvet Soft Cushion", price: 800, category: "Textiles", stock: 24, status: "In Stock", image: "https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb?auto=format&fit=crop&q=80&w=200" },
  { id: "4", name: "Handcrafted Teak Chair", price: 15000, category: "Furniture", stock: 2, status: "Low Stock", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=200" },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold font-outfit">Product Management</h1>
          <p className="text-muted-foreground">Manage your catalog, stock, and pricing.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>New Product</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-4 bg-white dark:bg-white/5 border border-border rounded-2xl font-semibold hover:bg-accent transition-all">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-4 bg-white dark:bg-white/5 border border-border rounded-2xl font-semibold hover:bg-accent transition-all">
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-white/5 border border-border rounded-[32px] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-accent/30">
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Product</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Price</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Stock</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-accent/20 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-accent/50">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">ID: #{product.id.padStart(4, '0')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 font-medium text-muted-foreground">{product.category}</td>
                <td className="px-8 py-6 font-bold">{formatPrice(product.price)}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold">{product.stock} units</span>
                    <div className="w-24 h-1.5 bg-accent rounded-full mt-2 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          product.stock < 10 ? "bg-orange-500" : "bg-green-500"
                        )} 
                        style={{ width: `${Math.min((product.stock / 30) * 100, 100)}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold",
                    product.status === "In Stock" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                  )}>
                    {product.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-accent rounded-xl transition-colors">
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-xl transition-colors">
                      <Edit className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 rounded-xl transition-colors">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
