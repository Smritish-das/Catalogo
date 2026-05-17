"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Copy, RotateCcw, Check, Hash, Type } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { toast } from "sonner";

export default function AICopywriterPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    title?: string;
    description?: string;
    hashtags?: string[];
    caption?: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input) return toast.error("Please enter some product details");
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        title: "Azure Ergonomic Velvet Armchair",
        description: "Experience the perfect blend of luxury and comfort with our Azure Armchair. Featuring handcrafted teak wood legs and premium velvet upholstery, this piece is designed to elevate any modern interior. The ergonomic silhouette ensures maximum relaxation while adding a touch of sophisticated color to your living space.",
        hashtags: ["#ModernLiving", "#LuxuryInteriors", "#VelvetChair", "#HomeDecor"],
        caption: "Elevate your lounging experience with the Azure Ergonomic Velvet Armchair. ✨ Handcrafted details meet plush comfort. Now available in our collection. Send a DM or tap the link in bio to inquire! 🛋️💙"
      });
      setIsLoading(false);
      toast.success("Content generated successfully!");
    }, 2000);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
          <Sparkles className="text-primary-foreground w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-outfit">AI Copywriter</h1>
          <p className="text-muted-foreground text-sm">Create premium product content in seconds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/5 border border-border p-8 rounded-[32px] shadow-sm">
            <label className="block text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Product Details
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Blue chair, wooden legs, very soft, minimalist design, for living room..."
              className="w-full h-48 bg-accent/30 border-none rounded-2xl p-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none mb-6"
            />
            
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <RotateCcw className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span>Generate Magic Content</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-accent/20 p-6 rounded-2xl">
            <h4 className="text-sm font-bold mb-2">Tips for better results:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Include materials (velvet, wood, brass)</li>
              <li>• Mention the target room or occasion</li>
              <li>• Add specific colors and textures</li>
              <li>• Describe the "vibe" (minimalist, rustic, luxury)</li>
            </ul>
          </div>
        </div>

        {/* Output Section */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Generated Title */}
                <div className="bg-white dark:bg-white/5 border border-border p-6 rounded-2xl group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-muted-foreground">
                      <Type className="w-3 h-3" />
                      <span>SUGGESTED TITLE</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(results.title!, "title")}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      {copiedField === "title" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xl font-bold">{results.title}</p>
                </div>

                {/* Generated Description */}
                <div className="bg-white dark:bg-white/5 border border-border p-6 rounded-2xl group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-xs font-bold text-muted-foreground">
                      <Sparkles className="w-3 h-3" />
                      <span>PREMIUM DESCRIPTION</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(results.description!, "description")}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      {copiedField === "description" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{results.description}"
                  </p>
                </div>

                {/* Social Media Section */}
                <div className="bg-white dark:bg-white/5 border border-border p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-xs font-bold text-muted-foreground">
                      <FaInstagram className="w-3 h-3" />
                      <span>INSTAGRAM READY</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(results.caption!, "caption")}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      {copiedField === "caption" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="bg-accent/30 p-4 rounded-xl text-sm mb-4">
                    {results.caption}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.hashtags?.map((tag) => (
                      <span key={tag} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-[32px] flex flex-col items-center justify-center text-center p-12 text-muted-foreground">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>Generated content will appear here.</p>
                <p className="text-sm">Start typing on the left to create magic.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
