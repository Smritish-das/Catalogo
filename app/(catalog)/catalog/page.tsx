"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/product/product-card";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for initial catalog
const MOCK_PRODUCTS = [
  { id: "1", name: "Premium Blue Vase", price: 1200, images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600"], slug: "blue-vase" },
  { id: "2", name: "Gold Minimalist Frame", price: 3000, images: ["https://images.unsplash.com/photo-1766579696917-5335e0a82962?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"], slug: "gold-frame" },
  { id: "3", name: "Velvet Soft Cushion", price: 800, images: ["https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb?auto=format&fit=crop&q=80&w=600"], slug: "soft-cushion" },
  { id: "4", name: "Handcrafted Teak Chair", price: 15000, images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600"], slug: "teak-chair" },
  { id: "5", name: "Modern Ceramic Lamp", price: 4500, images: ["https://images.unsplash.com/photo-1751564360676-0482a3f32941?q=80&w=739&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"], slug: "ceramic-lamp" },
  { id: "6", name: "Art Deco Mirror", price: 7200, images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600"], slug: "deco-mirror" },
  { id: "7", name: "Brass Candle Holder", price: 1800, images: ["https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=600"], slug: "candle-holder" },
  { id: "8", name: "Linen Table Runner", price: 2200, images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600"], slug: "table-runner" },
];

const CATEGORIES = ["All", "Home Decor", "Furniture", "Lighting", "Textiles", "Art"];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">The Collection</h1>
            <p className="text-muted-foreground text-lg">Curated essentials for modern living.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative group flex-1 md:w-80">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="AI Search: Something blue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-accent/50 border-none rounded-2xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
              <div className="absolute inset-y-0 right-4 flex items-center text-primary">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <button className="p-4 bg-accent/50 rounded-2xl hover:bg-accent transition-colors">
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-8 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-accent/50 text-muted-foreground hover:bg-accent"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid (Pinterest-style Masonry) */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {MOCK_PRODUCTS.map((product, i) => (
            <div key={product.id} className="break-inside-avoid">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {/* Load More Trigger */}
        <div className="mt-20 flex justify-center">
          <button className="px-12 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-all">
            Explore More
          </button>
        </div>
      </main>
    </div>
  );
}
