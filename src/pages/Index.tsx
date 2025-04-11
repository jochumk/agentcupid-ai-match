
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedAgents from "@/components/FeaturedAgents";
import HowItWorks from "@/components/HowItWorks";
import TestimonialSection from "@/components/TestimonialSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <HeroSection />
        <div className="container mx-auto px-4 py-8 text-center">
          <Button size="lg" asChild className="mt-4">
            <Link to="/find-agents" className="flex items-center">
              Find AI Agents
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <FeaturedAgents />
        <HowItWorks />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
