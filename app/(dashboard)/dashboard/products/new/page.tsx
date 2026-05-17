"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  Plus, 
  Image as ImageIcon, 
  Upload,
  RotateCcw,
  Wand2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function NewProductPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    tags: ""
  });

  const handleMagicFill = async () => {
    if (!formData.name && !formData.description) {
      return toast.error("Please enter a name or brief description first!");
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          input: formData.name || formData.description,
          tone: "Luxury",
          platform: "Website"
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to generate");

      setFormData(prev => ({
        ...prev,
        name: data.title || prev.name,
        description: data.description || prev.description,
        category: data.suggestedCategory || prev.category,
        tags: data.suggestedTags?.join(", ") || prev.tags
      }));

      toast.success("AI has polished your product details!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      {/* Back Button */}
      <Link 
        href="/dashboard/products" 
        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>

      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold font-outfit">Add New Product</h1>
          <p className="text-muted-foreground">Create a new piece for your premium catalog.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleMagicFill}
          disabled={isGenerating}
          className="rounded-2xl px-6 h-12 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-bold transition-all"
        >
          {isGenerating ? (
            <RotateCcw className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2" />
          )}
          Magic AI Fill
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white dark:bg-white/5 p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest ml-1">Product Name</Label>
                <Input 
                  placeholder="e.g. Azure Velvet Armchair" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-14 rounded-2xl bg-accent/30 border-none px-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest ml-1">Description</Label>
                <textarea 
                  placeholder="Tell the story of this piece..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full h-48 rounded-2xl bg-accent/30 border-none p-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest ml-1">Price (INR)</Label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="h-14 rounded-2xl bg-accent/30 border-none px-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest ml-1">Initial Stock</Label>
                  <Input 
                    type="number" 
                    placeholder="10" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="h-14 rounded-2xl bg-accent/30 border-none px-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest ml-1">Category</Label>
                <Input 
                  placeholder="e.g. Furniture" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="h-14 rounded-2xl bg-accent/30 border-none px-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar: Media & Status */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white dark:bg-white/5 p-8">
            <Label className="text-xs font-bold uppercase tracking-widest block mb-4">Product Images</Label>
            <div className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-8 hover:bg-accent/30 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-bold mb-1">Upload Images</p>
              <p className="text-xs text-muted-foreground">Drag and drop or click to browse. Max 5MB per image.</p>
            </div>
          </Card>

          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white dark:bg-white/5 p-8">
            <Label className="text-xs font-bold uppercase tracking-widest block mb-4">Search Tags</Label>
            <textarea 
              placeholder="minimal, velvet, blue..." 
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full h-24 rounded-2xl bg-accent/30 border-none p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
            />
          </Card>

          <Button className="w-full py-8 rounded-[24px] text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Publish Product
          </Button>
        </div>
      </div>
    </div>
  );
}
