import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import ProductsSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import SocialProofSection from "@/components/SocialProofSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalShowcaseSection from "@/components/FinalShowcaseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <ProblemSolutionSection />
        <ProductsSection />
        <BenefitsSection />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
        <FinalShowcaseSection />
      </main>

      <Footer />
    </div>
  );
}
