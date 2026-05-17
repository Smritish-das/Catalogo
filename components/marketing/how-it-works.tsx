"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, MessageSquare, CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Browse",
    description: "Explore our curated collections of premium products.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Select",
    description: "Add items you love to your personal selection list.",
    icon: ShoppingBag,
    color: "bg-purple-500",
  },
  {
    title: "WhatsApp Seller",
    description: "Send your list directly to the seller with one click.",
    icon: MessageSquare,
    color: "bg-green-500",
  },
  {
    title: "Confirm Order",
    description: "Finalize details and confirm your purchase instantly.",
    icon: CheckCircle2,
    color: "bg-orange-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#fafafa] dark:bg-black/40">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-outfit mb-4">How it Works</h2>
        <p className="text-muted-foreground text-lg mb-16">Simple, visual, and personal.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group transform-gpu"
            >
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-gradient-to-r from-muted-foreground/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
