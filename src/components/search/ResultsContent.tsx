
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck } from "lucide-react";
import FeaturedAgentCard from "./FeaturedAgentCard";
import AgentGridCard from "./AgentGridCard";
import AgentListCard from "./AgentListCard";
import NoResultsFound from "./NoResultsFound";

interface ResultsContentProps {
  filteredAgents: any[];
  viewMode: "grid" | "list";
  selectedAgents: number[];
  toggleAgentSelection: (agentId: number) => void;
  expandedDescriptions: number[];
  toggleDescriptionExpand: (agentId: number) => void;
  handleOpenExternalAgent: (url: string) => void;
  renderStars: (rating: number) => React.ReactNode;
  resetFilters: () => void;
}

export default function ResultsContent({
  filteredAgents,
  viewMode,
  selectedAgents,
  toggleAgentSelection,
  expandedDescriptions,
  toggleDescriptionExpand,
  handleOpenExternalAgent,
  renderStars,
  resetFilters
}: ResultsContentProps) {
  const hasResults = filteredAgents.length > 0;

  if (!hasResults) {
    return <NoResultsFound resetFilters={resetFilters} />;
  }

  return (
    <>
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Results ({filteredAgents.length})</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
          <TabsTrigger value="best-value">Best Value</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredAgents.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BadgeCheck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Featured Email Automation</h2>
          </div>
          
          <FeaturedAgentCard 
            agent={filteredAgents[0]} 
            expandedDescriptions={expandedDescriptions}
            toggleDescriptionExpand={toggleDescriptionExpand}
            selectedAgents={selectedAgents}
            toggleAgentSelection={toggleAgentSelection}
            handleOpenExternalAgent={handleOpenExternalAgent}
            renderStars={renderStars}
          />
        </div>
      )}
      
      <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
        {filteredAgents.slice(1).map((agent) => (
          viewMode === "grid" ? (
            <AgentGridCard
              key={agent.id}
              agent={agent}
              selectedAgents={selectedAgents}
              toggleAgentSelection={toggleAgentSelection}
              handleOpenExternalAgent={handleOpenExternalAgent}
              renderStars={renderStars}
            />
          ) : (
            <AgentListCard
              key={agent.id}
              agent={agent}
              selectedAgents={selectedAgents}
              toggleAgentSelection={toggleAgentSelection}
              handleOpenExternalAgent={handleOpenExternalAgent}
              renderStars={renderStars}
            />
          )
        ))}
      </div>
    </>
  );
}
