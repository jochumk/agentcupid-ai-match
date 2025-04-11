
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, BookmarkPlus, ArrowRight } from "lucide-react";

interface AgentGridCardProps {
  agent: any;
  selectedAgents: number[];
  toggleAgentSelection: (id: number) => void;
  handleOpenExternalAgent: (url: string) => void;
  renderStars: (rating: number) => React.ReactNode;
}

export default function AgentGridCard({
  agent,
  selectedAgents,
  toggleAgentSelection,
  handleOpenExternalAgent,
  renderStars
}: AgentGridCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={agent.imageUrl} 
            alt={agent.name} 
            className="w-full h-full object-cover"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
            onClick={() => toggleAgentSelection(agent.id)}
          >
            {selectedAgents.includes(agent.id) ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <BookmarkPlus className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <CardTitle className="text-lg mb-2">{agent.name}</CardTitle>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{agent.description}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {renderStars(agent.rating)}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({agent.rating}) • {agent.reviews} reviews
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ${agent.price}/{agent.priceModel}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {agent.setupDifficulty}
          </span>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map((capability: string) => (
              <span 
                key={capability} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600"
              >
                {capability}
              </span>
            ))}
            {agent.capabilities.length > 3 && (
              <span className="text-xs text-gray-500">+{agent.capabilities.length - 3} more</span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-5 py-3 border-t bg-gray-50 flex justify-between">
        {agent.externalUrl ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleOpenExternalAgent(agent.externalUrl as string)}
            className="flex items-center"
          >
            Get the Agent
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link to={`/agent/${agent.id}`} className="flex items-center">
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        )}
        <Button size="sm">Quick Setup</Button>
      </CardFooter>
    </Card>
  );
}
