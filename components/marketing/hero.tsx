"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedGradient } from "@/components/animations/animated-gradient";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#fafafa] dark:bg-black">
      <AnimatedGradient />
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[100px] transform-gpu" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-[100px] transform-gpu" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 px-4 py-1.5 rounded-full mb-8 transform-gpu"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              WhatsApp-First Commerce
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold font-outfit tracking-tight mb-6 leading-[1.1] transform-gpu"
          >
            Browse Beautiful <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Collections
            </span>{" "}
            Instantly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl transform-gpu"
          >
            Discover curated products and connect directly with sellers on WhatsApp. The most visual way to shop and inquire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 transform-gpu"
          >
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center justify-center space-x-2 group hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://wa.me/910000000000"
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95"
            >
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span>Chat on WhatsApp</span>
            </Link>
          </motion.div>
        </div>

        {/* Floating Product Cards (Optimized) */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto pb-12">
          {[
            "1586023492125-27b2c045efd7",
            "1511795409834-ef04bbd61622",
            "1592078615290-033ee584e267",
            "1445205170230-053b83016050"
          ].map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-xl transform-gpu"
            >
              <Image
                src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=400`}
                alt={`Product ${i}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <p className="text-white font-medium">Premium Collection</p>
                <p className="text-white/70 text-sm">View Items</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
