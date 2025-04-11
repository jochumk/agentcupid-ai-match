
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchAssistant from "@/components/search/SearchAssistant";

interface AgentSearchTabProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedCategories: string[];
  selectedTools: string[];
  setupTime: string;
  onSubmit: (e: React.FormEvent) => void;
  examplePrompts: string[];
  onPromptClick: (prompt: string) => void;
}

export default function AgentSearchTab({
  searchQuery,
  onSearch,
  selectedCategories,
  selectedTools,
  setupTime,
  onSubmit,
  examplePrompts,
  onPromptClick
}: AgentSearchTabProps) {
  return (
    <div className="space-y-4">
      <SearchAssistant onSearch={onSearch} initialQuery={searchQuery} />
      
      <div className="max-w-4xl mx-auto mt-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {examplePrompts.map((prompt) => (
            <Button
              key={prompt}
              variant="outline"
              className="rounded-full"
              onClick={() => onPromptClick(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={onSubmit} 
        className="w-full rounded-full mt-4"
        disabled={!searchQuery.trim()}
      >
        <Search className="mr-2 h-5 w-5" />
        Find AI Agents
      </Button>
    </div>
  );
}
