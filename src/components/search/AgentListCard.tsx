
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, BookmarkPlus, Sliders, Clock, BarChart } from "lucide-react";

interface AgentListCardProps {
  agent: any;
  selectedAgents: number[];
  toggleAgentSelection: (id: number) => void;
  handleOpenExternalAgent: (url: string) => void;
  renderStars: (rating: number) => React.ReactNode;
}

export default function AgentListCard({
  agent,
  selectedAgents,
  toggleAgentSelection,
  handleOpenExternalAgent,
  renderStars
}: AgentListCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative h-full min-h-[120px] overflow-hidden">
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
        <div className="md:col-span-2 p-5">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">{agent.name}</h3>
                <span className="text-lg font-medium">${agent.price}/{agent.priceModel}</span>
              </div>
              
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {renderStars(agent.rating)}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({agent.rating}) • {agent.reviews} reviews
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{agent.description}</p>
              
              <div className="flex flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-1 text-xs">
                  <Sliders className="h-3 w-3 text-gray-500" />
                  <span>{agent.setupDifficulty} Setup</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span>{agent.responseTime} Response</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <BarChart className="h-3 w-3 text-gray-500" />
                  <span>Saves {agent.timeSaving}</span>
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
            </div>
            
            <div className="flex gap-3 mt-auto">
              {agent.externalUrl ? (
                <Button 
                  size="sm" 
                  onClick={() => handleOpenExternalAgent(agent.externalUrl as string)}
                >
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
                {selectedAgents.includes(agent.id) ? "Selected" : "Compare"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
