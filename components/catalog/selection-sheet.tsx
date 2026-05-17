"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag } from "lucide-react";
import { useSelectionStore } from "@/store/use-selection-store";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

export function SelectionSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useSelectionStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSendToWhatsApp = () => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "910000000000";
    let message = "Hi, I'm interested in the following items from your catalog:\n\n";
    
    items.forEach((item) => {
      message += `• ${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    message += `\nTotal: ${formatPrice(totalPrice())}\n\nIs this selection available?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-border flex items-center justify-between bg-white dark:bg-black">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-outfit">My Selection</h2>
                  <p className="text-sm text-muted-foreground">{totalItems()} items</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Your selection is empty</h3>
                  <p className="text-muted-foreground max-w-[240px]">
                    Browse our catalog and add items you love to get started.
                  </p>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-4 bg-accent/30 p-4 rounded-2xl group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-sm truncate pr-2">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-primary font-bold mb-3">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center space-x-4 bg-white/50 dark:bg-white/5 rounded-lg w-fit px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4 bg-white dark:bg-black">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Estimated Total</span>
                  <span className="text-primary">{formatPrice(totalPrice())}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Tax and shipping will be calculated by the seller.
                </p>
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full py-5 bg-green-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-green-600 transition-all shadow-xl shadow-green-500/10 active:scale-[0.98]"
                >
                  <MessageSquare className="w-6 h-6" />
                  <span>Send to Seller on WhatsApp</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
