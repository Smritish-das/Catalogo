"use client";

import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { MessageSquare, ShoppingBag, ArrowLeft, Heart, Share2, Plus, Minus } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { useSelectionStore } from "@/store/use-selection-store";
import { toast } from "sonner";

// Mock data (in a real app, fetch from Prisma)
const MOCK_PRODUCTS = {
  "blue-vase": {
    id: "1",
    name: "Premium Blue Vase",
    price: 1200,
    description: "Handcrafted ceramic vase with a deep azure glaze. Perfect for modern living spaces and minimalist interiors. Each piece is unique due to the glazing process.",
    images: [
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1612196446415-321736a146ec?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=800"
    ],
    features: ["Handcrafted ceramic", "Deep azure glaze", "Water-resistant", "Height: 25cm"],
  },
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const product = MOCK_PRODUCTS[slug as keyof typeof MOCK_PRODUCTS];
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useSelectionStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }
    toast.success(`Added ${quantity} ${product.name} to selection`);
  };

  const handleWhatsApp = () => {
    const text = `Hi, I'm interested in the ${product.name} (${formatPrice(product.price)}). Is it available?`;
    window.open(`https://wa.me/910000000000?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              layoutId={`image-${product.id}`}
              className="relative aspect-square rounded-[40px] overflow-hidden bg-accent/50 shadow-2xl"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0",
                    activeImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-1.5 bg-accent/50 rounded-full text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  In Stock
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-3 bg-accent/50 rounded-full hover:bg-accent transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-accent/50 rounded-full hover:bg-accent transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-5xl font-bold font-outfit mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-8">{formatPrice(product.price)}</p>
              
              <div className="space-y-6 mb-12">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>
                
                <ul className="grid grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection Controls */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-6 bg-accent/50 self-start px-6 py-3 rounded-2xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAdd}
                    className="flex-1 px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    <span>Add to Selection</span>
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 px-8 py-5 bg-green-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-green-600 shadow-xl shadow-green-500/10 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span>WhatsApp Seller</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products Placeholder */}
        <section className="mt-32">
          <h2 className="text-3xl font-bold font-outfit mb-12">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* ... would map through related products */}
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border p-4 z-50 flex gap-4">
        <button
          onClick={handleAdd}
          className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex-1 py-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </button>
      </div>
    </div>
  );
}
