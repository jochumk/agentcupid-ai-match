
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, Clock, BarChart, ChevronDown, ChevronUp } from "lucide-react";

interface FeaturedAgentCardProps {
  agent: any;
  expandedDescriptions: number[];
  toggleDescriptionExpand: (id: number) => void;
  selectedAgents: number[];
  toggleAgentSelection: (id: number) => void;
  handleOpenExternalAgent: (url: string) => void;
  renderStars: (rating: number) => React.ReactNode;
}

export default function FeaturedAgentCard({
  agent,
  expandedDescriptions,
  toggleDescriptionExpand,
  selectedAgents,
  toggleAgentSelection,
  handleOpenExternalAgent,
  renderStars
}: FeaturedAgentCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-primary/30">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 md:col-span-2">
          <CardTitle className="text-xl mb-2">{agent.name}</CardTitle>
          <div className="relative">
            <p className="text-gray-600 mb-4">
              {expandedDescriptions.includes(agent.id) 
                ? agent.description
                : `${agent.description.substring(0, 200)}...`}
            </p>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-primary flex items-center"
              onClick={() => toggleDescriptionExpand(agent.id)}
            >
              {expandedDescriptions.includes(agent.id) 
                ? <>Show less <ChevronUp className="ml-1 h-3 w-3" /></>
                : <>Show more <ChevronDown className="ml-1 h-3 w-3" /></>}
            </Button>
          </div>
          
          <div className="flex items-center gap-1 mb-4">
            <div className="flex">
              {renderStars(agent.rating)}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({agent.rating}) • {agent.reviews} reviews
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Price</span>
              <span className="font-medium">${agent.price}/{agent.priceModel}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Setup</span>
              <span className="font-medium">{agent.setupDifficulty}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Response Time</span>
              <span className="font-medium">{agent.responseTime}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">User Capacity</span>
              <span className="font-medium">{agent.userCapacity}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {agent.capabilities.map((capability: string) => (
              <span 
                key={capability} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
              >
                {capability}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3">
            {agent.externalUrl ? (
              <Button size="sm" onClick={() => handleOpenExternalAgent(agent.externalUrl as string)}>
                Get the Agent
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link to={`/agent/${agent.id}`}>
                  View Details
                </Link>
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleAgentSelection(agent.id)}
              className={selectedAgents.includes(agent.id) ? "bg-primary/10" : ""}
            >
              {selectedAgents.includes(agent.id) ? "Selected" : "Select for Comparison"}
            </Button>
          </div>
        </div>
        
        <div className="relative h-full min-h-[200px] bg-gray-100">
          <img 
            src={agent.imageUrl} 
            alt={agent.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-4">
            <div className="grid grid-cols-2 gap-2 text-white">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Saves {agent.timeSaving}</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                <span className="text-sm">Saves {agent.costSaving}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
