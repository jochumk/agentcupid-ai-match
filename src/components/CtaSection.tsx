
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Perfect AI Match?</h2>
            <p className="mt-4 text-lg opacity-90">
              Join AgentCupid today and connect with the AI solutions or customers that are right for you.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/discover" className="flex items-center">
                  Find AI Agents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/sell-your-agent">Sell Your AI Agent</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
