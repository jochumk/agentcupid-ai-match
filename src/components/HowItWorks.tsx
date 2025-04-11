
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, CheckCircle, Users } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold">How AgentCupid Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            We simplify the process of finding and implementing the right AI solutions for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* For Customers */}
          <div className="space-y-10">
            <h3 className="text-2xl font-bold">For Customers</h3>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Discover AI Agents</h4>
                <p className="text-gray-600">
                  Browse our marketplace to find AI agents that match your specific business needs and requirements.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Choose Your Solution</h4>
                <p className="text-gray-600">
                  Compare features, read reviews, and select the AI agent that's the perfect fit for your business.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Implementation Support</h4>
                <p className="text-gray-600">
                  Get help integrating your chosen AI solution with optional developer support as needed.
                </p>
              </div>
            </div>

            <Button asChild>
              <Link to="/discover" className="flex items-center">
                Browse AI Agents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* For Developers */}
          <div className="space-y-10">
            <h3 className="text-2xl font-bold">For Developers</h3>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Showcase Your Agent</h4>
                <p className="text-gray-600">
                  List your AI agent on our marketplace with detailed features, demos, and integration guides.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Connect With Customers</h4>
                <p className="text-gray-600">
                  Get matched with businesses looking for exactly the solution you provide.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Grow Your Business</h4>
                <p className="text-gray-600">
                  Expand your customer base and offer optional implementation services for additional revenue.
                </p>
              </div>
            </div>

            <Button variant="outline" asChild>
              <Link to="/sell-your-agent" className="flex items-center">
                Sell Your AI Agent
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
