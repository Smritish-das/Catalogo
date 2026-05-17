"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Copy, 
  RotateCcw, 
  Check, 
  Type, 
  FileText, 
  Instagram,
  Tag,
  Layout
} from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TONES = ["Luxury", "Minimal", "Elegant", "Modern", "Playful"];
const PLATFORMS = [
  { id: "Website", icon: Layout },
  { id: "Instagram", icon: FaInstagram },
  { id: "WhatsApp", icon: FaWhatsapp },
  { id: "Facebook", icon: FaFacebook },
];

export default function AIStudioPage() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Luxury");
  const [platform, setPlatform] = useState("Website");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input || input.length < 10) {
      return toast.error("Please provide at least 10 characters of product details.");
    }

    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, tone, platform }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to generate");

      setResults(data);
      toast.success("Magic content generated!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-primary rounded-[22px] flex items-center justify-center shadow-lg shadow-primary/20">
          <Sparkles className="text-primary-foreground w-7 h-7" />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight">AI Product Studio</h1>
          <p className="text-muted-foreground text-lg">Your premium AI co-pilot for high-end catalog management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Input */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="border-none bg-white dark:bg-white/5 shadow-xl rounded-[32px] overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Creative Brief
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your product in a few words... (e.g. Minimalist teak wood chair with velvet finish)"
                  className="w-full h-48 bg-accent/30 border-none rounded-2xl p-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Tone</label>
                  <div className="flex flex-wrap gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
                          tone === t 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "bg-accent/50 text-muted-foreground hover:bg-accent"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Platform</label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlatform(p.id)}
                        className={cn(
                          "p-3 rounded-xl transition-all",
                          platform === p.id 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "bg-accent/50 text-muted-foreground hover:bg-accent"
                        )}
                        title={p.id}
                      >
                        <p.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isLoading}
                className="w-full py-8 rounded-[20px] text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isLoading ? (
                  <RotateCcw className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-2" />
                    Generate AI Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="p-8 bg-primary/5 rounded-[32px] border border-primary/10">
            <h4 className="font-bold flex items-center gap-2 mb-4 text-primary">
              <Sparkles className="w-4 h-4" /> Pro Tips
            </h4>
            <ul className="text-sm text-muted-foreground space-y-3">
              <li className="flex gap-2"><span>✨</span> Mention specific materials like "Italian leather" or "Brushed brass".</li>
              <li className="flex gap-2"><span>✨</span> Add the intended mood like "Cosy", "Industrial", or "Futuristic".</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white dark:bg-white/5 border border-border p-8 rounded-[32px] space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))}
              </motion.div>
            ) : results ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Title Card */}
                <OutputCard 
                  title="Product Title" 
                  content={results.title} 
                  icon={Type} 
                  onCopy={() => copyToClipboard(results.title, "title")}
                  isCopied={copiedField === "title"}
                />

                {/* Description Card */}
                <OutputCard 
                  title="Premium Description" 
                  content={results.description} 
                  icon={FileText} 
                  onCopy={() => copyToClipboard(results.description, "desc")}
                  isCopied={copiedField === "desc"}
                  isLong
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category & Tags */}
                  <Card className="bg-white dark:bg-white/5 border-none shadow-lg rounded-[32px] p-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">
                      <Tag className="w-3 h-3" /> Categorization
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase">Suggested Category</p>
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm">
                          {results.suggestedCategory}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase">Suggested Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {results.suggestedTags?.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-accent rounded-lg text-xs font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Social Card */}
                  <Card className="bg-white dark:bg-white/5 border-none shadow-lg rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <Instagram className="w-3 h-3" /> Social Ready
                      </div>
                      <button onClick={() => copyToClipboard(results.caption, "social")}>
                        {copiedField === "social" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-4 italic mb-4">"{results.caption}"</p>
                    <div className="flex flex-wrap gap-1">
                      {results.hashtags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold text-primary">{tag}</span>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[600px] border-2 border-dashed border-border rounded-[48px] flex flex-col items-center justify-center text-center p-12 text-muted-foreground group"
              >
                <div className="w-20 h-20 bg-accent rounded-[32px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Ready to create magic?</h3>
                <p className="max-w-xs mx-auto">Fill in the product details on the left and let our AI generate premium content for your showroom.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OutputCard({ title, content, icon: Icon, onCopy, isCopied, isLong = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-white/5 border border-border p-8 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <button 
          onClick={onCopy}
          className="p-2 hover:bg-accent rounded-xl transition-colors"
        >
          {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
        </button>
      </div>
      <p className={cn(
        "text-foreground",
        isLong ? "text-lg leading-relaxed text-muted-foreground" : "text-2xl font-bold font-outfit"
      )}>
        {content}
      </p>
    </motion.div>
  );
}
