import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/marketing/hero";
import { Categories } from "@/components/marketing/categories";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <Footer />
    </main>
  );
}
