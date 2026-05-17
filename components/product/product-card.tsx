"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useSelectionStore } from "@/store/use-selection-store";
import { toast } from "sonner";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
  };
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useSelectionStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success(`${product.name} added to selection`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-accent/50 mb-3 group-hover:shadow-2xl transition-all duration-500">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Wishlist Button */}
          <button 
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Added to wishlist");
            }}
          >
            <Heart className="w-5 h-5 text-primary" />
          </button>

          {/* Quick Add Button */}
          <button
            onClick={handleAdd}
            className="absolute bottom-4 left-4 right-4 py-3 bg-primary text-primary-foreground rounded-xl flex items-center justify-center space-x-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:opacity-90"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold text-sm">Quick Add</span>
          </button>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <div className="px-2">
          <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground font-medium">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
