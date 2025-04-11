
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Users } from "lucide-react";

// Mock data for featured agents
const featuredAgents = [
  {
    id: 1,
    name: "SupportBot Pro",
    description: "Automate customer support emails with AI that connects to your knowledge base.",
    category: "Email Automation",
    rating: 4.8,
    reviews: 129,
    price: "$49/mo",
    image: "https://via.placeholder.com/300x200?text=SupportBot+Pro",
    developer: "AI Solutions Inc.",
    featured: true,
  },
  {
    id: 2,
    name: "EmailGenius",
    description: "Smart email classification and response generation for high-volume support teams.",
    category: "Email Automation",
    rating: 4.6,
    reviews: 87,
    price: "$39/mo",
    image: "https://via.placeholder.com/300x200?text=EmailGenius",
    developer: "Quantum AI Labs",
    featured: false,
  },
  {
    id: 3,
    name: "DocConnect",
    description: "Connects your documentation to your email workflow for accurate customer responses.",
    category: "Documentation AI",
    rating: 4.7,
    reviews: 103,
    price: "$59/mo",
    image: "https://via.placeholder.com/300x200?text=DocConnect",
    developer: "TechAI Solutions",
    featured: true,
  }
];

const FeaturedAgents = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Featured AI Agents</h2>
            <p className="mt-2 text-gray-600">
              Discover top-rated solutions for your business needs
            </p>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/discover">View All Agents</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAgents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
                {agent.featured && (
                  <Badge className="absolute top-3 right-3 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <Badge variant="outline">{agent.category}</Badge>
                </div>
                <CardDescription className="text-xs text-gray-500">
                  by {agent.developer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2">{agent.description}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{agent.reviews} reviews</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">100+ users</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <span className="font-medium">{agent.price}</span>
                <Button size="sm" asChild>
                  <Link to={`/agent/${agent.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedAgents;
