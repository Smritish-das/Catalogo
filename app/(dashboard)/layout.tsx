"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MessageSquare, 
  BarChart3, 
  Sparkles, 
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Products", icon: ShoppingBag, href: "/dashboard/products" },
  { label: "Inquiries", icon: MessageSquare, href: "/dashboard/inquiries" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "AI Studio", icon: Sparkles, href: "/dashboard/ai-studio" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-black">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 bg-white dark:bg-white/5 border-r border-border transition-all duration-300",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="text-lg font-bold font-outfit tracking-tight">Showroom</span>
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-accent hover:text-primary"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                {!isCollapsed && <span className="font-semibold">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-4">
          <div className={cn(
            "flex items-center space-x-3 px-4 py-3 bg-accent/50 rounded-2xl",
            isCollapsed && "justify-center"
          )}>
            <UserButton afterSignOutUrl="/" />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-bold truncate">Admin Name</p>
                <p className="text-xs text-muted-foreground truncate">admin@showroom.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isCollapsed ? "pl-20" : "pl-72"
      )}>
        <header className="h-20 bg-white/80 dark:bg-black/40 backdrop-blur-md border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
          <h2 className="text-xl font-bold font-outfit">
            {menuItems.find(i => i.href === pathname)?.label || "Dashboard"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-accent/50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none w-64"
              />
            </div>
            <button className="p-2 bg-accent/50 rounded-xl hover:bg-accent transition-colors relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
        </header>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
