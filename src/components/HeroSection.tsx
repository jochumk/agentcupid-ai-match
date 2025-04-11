
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExampleSearch = () => {
    // Navigate to search results with the example query
    navigate("/search-results?query=Answer+customer+emails+automatically");
  };

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
            <Button size="lg" variant="outline" asChild>
              <Link to="/developer/dashboard">For AI Creators</Link>
            </Button>
          </div>
          
          {/* Example search suggestion */}
          <div className="mt-8 flex justify-center">
            <div 
              onClick={handleExampleSearch}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Try: <span className="font-medium text-primary">"Answer customer emails automatically"</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
