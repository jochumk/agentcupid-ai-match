
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Purple gradient background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute top-48 -left-24 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Your Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI Match</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            AgentCupid connects businesses with AI agents and developers to create powerful solutions for your unique needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/find-agents" className="flex items-center">
                Find AI Agents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary/70 shadow-[0_0_15px_rgba(155,135,245,0.4)] hover:shadow-[0_0_20px_rgba(155,135,245,0.6)] transition-shadow duration-300" 
              asChild
            >
              <Link to="/developer/dashboard">For AI Creators</Link>
            </Button>
          </div>
          <div className="mt-8">
            <Link 
              to="/search-results?q=Answer%20customer%20emails%20automatically" 
              className="inline-flex items-center text-primary hover:underline text-sm gap-1.5"
            >
              <Mail className="h-4 w-4" />
              New: Try our AI Email Intelligence Agent
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
