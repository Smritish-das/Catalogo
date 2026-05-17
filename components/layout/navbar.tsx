"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelectionStore } from "@/store/use-selection-store";
import { usePathname } from "next/navigation";
import { SelectionSheet } from "@/components/catalog/selection-sheet";

export function Navbar() {
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const totalItems = useSelectionStore((state) => state.totalItems());
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border py-3"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-primary-foreground w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-outfit tracking-tight">
              Digital<span className="text-muted-foreground">Showroom</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/catalog"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/catalog" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Catalog
            </Link>
            <Link
              href="/#categories"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Categories
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              How it Works
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-accent rounded-full transition-colors relative">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsSelectionOpen(true)}
              className="p-2 hover:bg-accent rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <Link
              href="/dashboard"
              className="hidden md:flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Admin
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col space-y-4 md:hidden"
            >
              <Link
                href="/catalog"
                className="text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link
                href="/#categories"
                className="text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/#how-it-works"
                className="text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="/dashboard"
                className="text-lg font-medium text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SelectionSheet isOpen={isSelectionOpen} onClose={() => setIsSelectionOpen(false)} />
    </>
  );
}
