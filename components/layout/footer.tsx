import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-border py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="text-lg font-bold font-outfit tracking-tight">
                Digital<span className="text-muted-foreground">Showroom</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The premium way to showcase your products and connect with customers on WhatsApp. Modern, minimal, and mobile-first.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/catalog" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/catalog?category=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/catalog?category=featured" className="hover:text-primary transition-colors">Featured</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <FaFacebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Digital Showroom. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
